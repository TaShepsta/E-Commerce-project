-- Run this once against your rentosphere database to create the users table.
-- CREATE DATABASE rentosphere; USE rentosphere; -- if not already created

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('owner', 'renter', 'admin') NOT NULL DEFAULT 'renter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- A product an owner has listed for rent.
-- Starts 'pending' until an admin evaluates and approves it (see business brief:
-- Product Listing -> Evaluation -> Approval & Listing).
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
    status ENUM('pending', 'approved', 'rejected', 'inactive') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- A renter's booking of a specific listing for a date range.
-- total_price is stored (not recalculated) so it stays fixed even if the
-- listing's price changes later.
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    renter_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending_payment', 'confirmed', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending_payment',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (renter_id) REFERENCES users(id) ON DELETE CASCADE
);