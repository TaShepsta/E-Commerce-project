-- ============================================================
-- RENTOSPHERE DATABASE SCHEMA
--
-- Run this once against a fresh database to create every table
-- the backend needs:
--   users            - everyone who signs up (renters and owners)
--   listings         - the products/items an owner is renting out
--   bookings         - the orders a renter makes against a listing
--   favorites        - a renter's saved/"interested in" listings
--   rental_earnings  - money an owner has earned from bookings
--
-- Usage:
--   mysql -u root -p < schema.sql
-- or paste the contents into MySQL Workbench / phpMyAdmin / TablePlus.
-- ============================================================

CREATE DATABASE IF NOT EXISTS rentosphere;

USE rentosphere;


-- ============================================================
-- USERS
-- Every account — renters, owners, and admins — lives in one
-- table, distinguished by `role`. This is what gets checked on
-- login, and what a listing/booking/favorite is linked back to.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM('owner', 'renter', 'admin')
        NOT NULL DEFAULT 'renter',

    -- used by the forgot/reset password flow
    reset_token_hash VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- LISTINGS
-- The products/equipment an owner is renting out. One row per
-- item. `status` is free text on purpose — different parts of
-- the app currently write different values here ('pending' /
-- 'approved' for the admin-review flow, 'Available' / 'Rented'
-- for the owner's own dashboard) — see the note at the bottom
-- of this file.
-- ============================================================

CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    owner_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(100),

    -- pricing
    daily_price DECIMAL(10,2) NOT NULL,
    weekly_price DECIMAL(10,2),
    monthly_price DECIMAL(10,2),
    price_unit VARCHAR(20) NOT NULL DEFAULT 'day',

    location VARCHAR(150),

    -- a listing's photo can come from either an uploaded file
    -- (backend/uploads/, referenced by image_url) or a browser
    -- upload stored directly in the database (image_data)
    image_url VARCHAR(255),
    image_data LONGBLOB,
    image_mime_type VARCHAR(100),
    image_alt VARCHAR(255),

    status VARCHAR(30) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- BOOKINGS
-- A renter's orders — one row per rental booking made against
-- a listing.
-- ============================================================

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    listing_id INT NOT NULL,
    renter_id INT NOT NULL,

    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    total_price DECIMAL(10,2) NOT NULL,

    status ENUM(
        'pending_payment',
        'confirmed',
        'in_progress',
        'completed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending_payment',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (listing_id)
        REFERENCES listings(id)
        ON DELETE CASCADE,

    FOREIGN KEY (renter_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- FAVORITES
-- A renter's saved/"interested in" listings — shown on their
-- account page. A user can only save the same listing once.
-- ============================================================

CREATE TABLE IF NOT EXISTS favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    listing_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (listing_id)
        REFERENCES listings(id)
        ON DELETE CASCADE,

    UNIQUE KEY unique_favorite (user_id, listing_id)
);


-- ============================================================
-- RENTAL EARNINGS
-- Money an owner has earned from their listings being booked.
-- Powers the "My Earnings" owner dashboard page.
-- ============================================================

CREATE TABLE IF NOT EXISTS rental_earnings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    owner_id INT NOT NULL,
    booking_id INT NULL,

    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    rental_date DATE NOT NULL DEFAULT (CURRENT_DATE),

    status ENUM(
        'pending',
        'Completed',
        'Paid'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE SET NULL
);


-- ============================================================
-- INDEXES
-- Speeds up the lookups the app actually does: browsing by
-- category/status, an owner's own listings, a renter's own
-- bookings/favorites.
-- ============================================================

CREATE INDEX idx_listings_owner       ON listings(owner_id);
CREATE INDEX idx_listings_status      ON listings(status);
CREATE INDEX idx_listings_category    ON listings(category);

CREATE INDEX idx_bookings_listing     ON bookings(listing_id);
CREATE INDEX idx_bookings_renter      ON bookings(renter_id);

CREATE INDEX idx_favorites_user       ON favorites(user_id);

CREATE INDEX idx_earnings_owner       ON rental_earnings(owner_id);


-- ============================================================
-- VERIFY
-- ============================================================

SHOW TABLES;


-- ============================================================
-- A NOTE ON `listings.status`
-- ============================================================
-- Two different parts of the codebase write to this column with
-- two different sets of values, and neither has been reconciled
-- yet — this schema leaves the column as free text (rather than
-- a strict ENUM) so neither one errors out on the other:
--
--   - Listings created via POST /api/listings (backend/src/routes/
--     listingRoutes.js) default to status = 'pending', and only
--     move to 'approved' / 'rejected' / 'inactive' via an admin
--     action. Public browsing only shows 'approved' listings.
--
--   - Listings created via POST /api/listings/manage (backend/src/
--     routes/listingsRoutes.js, the owner dashboard's "My Listings"
--     page) default to status = 'Available' instead, with no
--     approval step.
--
-- In practice this means a listing made through one flow won't
-- show up correctly in the other (an "Available" listing was
-- never 'approved', so it won't appear in the public /browse
-- results; a freshly 'pending' listing won't show as available
-- on the owner's dashboard). Worth picking one workflow and
-- updating the other controller to match before this goes live —
-- happy to do that pass whenever you're ready for it.