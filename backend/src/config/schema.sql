-- ============================================================
-- RENTOSPHERE DATABASE SCHEMA
-- ============================================================

CREATE DATABASE IF NOT EXISTS rentosphere;

USE rentosphere;


-- ============================================================
-- USERS
-- Stores renters, owners and administrators.
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM('owner', 'renter', 'admin')
        NOT NULL DEFAULT 'renter',

    reset_token_hash VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- LISTINGS
-- Equipment/products listed by owners for rental.
-- New listings start as 'pending' until approved by an admin.
-- ============================================================

CREATE TABLE IF NOT EXISTS listings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    owner_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT,
    category VARCHAR(100),

    daily_price DECIMAL(10,2) NOT NULL,
    weekly_price DECIMAL(10,2),
    monthly_price DECIMAL(10,2),

    location VARCHAR(150),

    -- Path to the uploaded image in backend/uploads/
    image_url VARCHAR(255),

    status ENUM(
        'pending',
        'approved',
        'rejected',
        'inactive'
    ) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- ============================================================
-- BOOKINGS
-- Stores rental bookings made by renters.
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
-- RENTAL EARNINGS
-- Stores earnings generated from completed/confirmed rentals.
-- Used by the owner earnings functionality.
-- ============================================================

CREATE TABLE IF NOT EXISTS rental_earnings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    owner_id INT NOT NULL,
    booking_id INT NULL,

    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'pending',
        'paid'
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
-- Improve searching/filtering of listings and bookings.
-- ============================================================

CREATE INDEX idx_listings_owner
    ON listings(owner_id);

CREATE INDEX idx_listings_status
    ON listings(status);

CREATE INDEX idx_listings_category
    ON listings(category);

CREATE INDEX idx_bookings_listing
    ON bookings(listing_id);

CREATE INDEX idx_bookings_renter
    ON bookings(renter_id);

CREATE INDEX idx_earnings_owner
    ON rental_earnings(owner_id);


-- ============================================================
-- VERIFY TABLES
-- ============================================================

SHOW TABLES;