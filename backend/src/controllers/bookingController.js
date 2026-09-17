import Booking from "../models/Booking.js";
import Product from "../models/product.js";
import User from "../models/User.js";
import { sendBookingRequestReceivedEmail } from "../services/emailService.js";

export const createBooking = async (req, res) => {
  console.log("========== BOOKING REQUEST RECEIVED ==========");
  console.log("REQUEST BODY:", req.body);
  console.log("LOGGED-IN USER:", req.user);
  console.log("==============================================");

  try {
    const { productId, startDate, endDate } = req.body;

    console.log("PRODUCT ID:", productId);
    console.log("START DATE:", startDate);
    console.log("END DATE:", endDate);

    // Check required booking information
    if (!productId || !startDate || !endDate) {
      console.log("BOOKING VALIDATION FAILED:", {
        productId,
        startDate,
        endDate,
      });

      return res.status(400).json({
        message: "Product, start date, and end date are required.",
      });
    }

    // Convert dates
    const start = new Date(`${startDate}T00:00:00`);

    const end = new Date(`${endDate}T00:00:00`);

    console.log("PARSED START DATE:", start);
    console.log("PARSED END DATE:", end);

    // Validate dates
    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      end < start
    ) {
      console.log("DATE VALIDATION FAILED");

      return res.status(400).json({
        message: "End date must be on or after the start date.",
      });
    }

    // Make sure we have a logged-in user
    if (!req.user || !req.user.id) {
      console.log("AUTHENTICATION ERROR: req.user is missing");

      return res.status(401).json({
        message: "You must be logged in to create a booking.",
      });
    }

    // Get product
    console.log("LOOKING FOR PRODUCT:", productId);

    const product = await Product.findById(productId);

    console.log("PRODUCT FOUND:", product);

    if (!product || product.status !== "Safety Verified") {
      console.log("PRODUCT NOT AVAILABLE:", productId);

      return res.status(404).json({
        message: "Product not found or not available for booking.",
      });
    }

    // Check if product is already booked
    console.log("CHECKING FOR CONFLICTING BOOKINGS...");

    const conflictingBooking = await Booking.findOverlappingByProduct(
      productId,
      startDate,
      endDate,
    );

    console.log("CONFLICTING BOOKING:", conflictingBooking);

    if (conflictingBooking) {
      return res.status(409).json({
        message: "This product is already booked for those dates.",
      });
    }

    // Calculate rental days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const days = Math.ceil((end - start) / millisecondsPerDay) || 1;

    console.log("RENTAL DAYS:", days);

    // Calculate total price
    const totalPrice = (Number(product.price_per_day) * days).toFixed(2);

    console.log("TOTAL PRICE:", totalPrice);

    // Create booking
    console.log("CREATING BOOKING IN DATABASE...");

    const booking = await Booking.create({
      productId,
      renterId: req.user.id,
      startDate,
      endDate,
      totalPrice,
    });

    console.log("BOOKING CREATED:", booking);

    // Find customer
    console.log("LOOKING FOR CUSTOMER:", req.user.id);

    const customer = await User.findById(req.user.id);

    console.log("CUSTOMER FOUND:", customer);

    // Booking was created but customer
    // could not be found
    if (!customer) {
      console.log("CUSTOMER NOT FOUND. BOOKING WAS CREATED.");

      return res.status(201).json({
        message:
          "Booking was created, but customer account could not be found.",
        booking,
        emailSent: false,
      });
    }

    // Booking was created but customer
    // does not have an email
    if (!customer.email) {
      console.log("CUSTOMER HAS NO EMAIL. BOOKING WAS CREATED.");

      return res.status(201).json({
        message:
          "Booking was created, but the customer does not have an email address.",
        booking,
        emailSent: false,
      });
    }

    // Send confirmation email
    console.log("SENDING BOOKING CONFIRMATION EMAIL TO:", customer.email);

    try {
      await sendBookingRequestReceivedEmail({
        customerName: customer.name || "Rentosphere customer",

        customerEmail: customer.email,

        bookingId: booking.id,

        listingName: product.title,

        startDate,

        endDate,

        totalPrice,

        status: booking.status,
      });

      console.log("BOOKING CONFIRMATION EMAIL SENT SUCCESSFULLY.");
    } catch (emailError) {
      console.error("[bookingController] Booking email failed:");

      console.error(emailError);

      return res.status(201).json({
        message:
          "Booking was created, but the confirmation email could not be sent.",

        booking,

        emailSent: false,

        emailError: emailError.message,
      });
    }

    // Everything succeeded
    console.log("========== BOOKING COMPLETED SUCCESSFULLY ==========");

    return res.status(201).json({
      message: "Booking request received and confirmation email sent.",

      booking,

      emailSent: true,
    });
  } catch (err) {
    console.error("========== CREATE BOOKING ERROR ==========");

    console.error("ERROR MESSAGE:", err.message);

    console.error("ERROR CODE:", err.code);

    console.error("FULL ERROR:", err);

    console.error("==========================================");

    return res.status(500).json({
      message: "Something went wrong while creating the booking.",

      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
};

// -----------------------------------------
// GET MY BOOKINGS
// -----------------------------------------

export const getMyBookings = async (req, res) => {
  try {
    console.log("GETTING BOOKINGS FOR USER:", req.user.id);

    const bookings = await Booking.findByRenterId(req.user.id);

    res.status(200).json({
      bookings,
    });
  } catch (err) {
    console.error("Get my bookings error:", err);

    res.status(500).json({
      message: "Something went wrong while fetching your bookings.",
    });
  }
};

export const getBookingsOnMyListings = async (req, res) => {
  try {
    const bookings = await Booking.findByOwnerId(req.user.id);

    res.status(200).json({
      bookings,
    });
  } catch (err) {
    console.error("Get bookings on my listings error:", err);

    res.status(500).json({
      message: "Something went wrong while fetching bookings.",
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending_payment",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status.",
      });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    // Admin can update any booking.
    // Renter can update their own booking.
    if (req.user.role !== "admin") {
      const isRenter =
        req.user.role === "renter" && booking.renter_id === req.user.id;

      if (!isRenter) {
        return res.status(403).json({
          message: "You do not have permission to update this booking.",
        });
      }
    }

    const updated = await Booking.updateStatus(req.params.id, status);

    res.status(200).json({
      message: "Booking status updated.",

      booking: updated,
    });
  } catch (err) {
    console.error("Update booking status error:", err);

    res.status(500).json({
      message: "Something went wrong while updating the booking.",
    });
  }
};
