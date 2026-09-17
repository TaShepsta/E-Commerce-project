import express from "express";
const router = express.Router();

import {
  initiatePayment,
  handleNotify,
  getPaymentStatus,
} from "../controllers/payfastController.js";
import authenticate from "../middleware/auth.js";

// Renter starts a payment for one or more of their own bookings.
router.post("/initiate", authenticate, initiatePayment);

// PayFast's servers call this directly — no auth, no CORS. Must stay public.
router.post("/notify", handleNotify);

// Frontend polls this from the success/cancel pages.
router.get("/status/:mPaymentId", authenticate, getPaymentStatus);

export default router;
