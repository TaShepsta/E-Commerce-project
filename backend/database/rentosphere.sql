

DROP DATABASE IF EXISTS rentosphere;
CREATE DATABASE rentosphere
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rentosphere;


CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM('owner', 'renter', 'admin')
        NOT NULL DEFAULT 'renter',

    reset_token_hash VARCHAR(255) NULL,
    reset_token_expires DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;



CREATE TABLE listings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    owner_id INT UNSIGNED NOT NULL,

    title VARCHAR(150) NOT NULL,
    description TEXT NULL,
    category VARCHAR(100) NOT NULL,

    daily_price DECIMAL(10,2) NOT NULL,
    weekly_price DECIMAL(10,2) NULL,
    monthly_price DECIMAL(10,2) NULL,
    price_unit ENUM('day', 'week', 'month') NOT NULL DEFAULT 'day',

    location VARCHAR(150) NULL,

    image_url VARCHAR(500) NULL,
    image_data LONGBLOB NULL,
    image_mime_type VARCHAR(100) NULL,
    image_alt VARCHAR(255) NULL,

    status ENUM(
        'Available',
        'Paused',
        'pending',
        'approved',
        'rejected',
        'inactive'
    ) NOT NULL DEFAULT 'Available',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_listings_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_listings_owner ON listings(owner_id);
CREATE INDEX idx_listings_status ON listings(status);
CREATE INDEX idx_listings_category ON listings(category);
CREATE INDEX idx_listings_location ON listings(location);

-- ============================================================
-- 3. BOOKINGS
-- ============================================================

CREATE TABLE bookings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    listing_id INT UNSIGNED NOT NULL,
    renter_id INT UNSIGNED NOT NULL,

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

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_bookings_listing
        FOREIGN KEY (listing_id)
        REFERENCES listings(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_bookings_renter
        FOREIGN KEY (renter_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_booking_dates
        CHECK (end_date >= start_date)
) ENGINE=InnoDB;

CREATE INDEX idx_bookings_listing ON bookings(listing_id);
CREATE INDEX idx_bookings_renter ON bookings(renter_id);
CREATE INDEX idx_bookings_status ON bookings(status);



CREATE TABLE favorites (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,
    listing_id INT UNSIGNED NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_favorites_listing
        FOREIGN KEY (listing_id)
        REFERENCES listings(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_favorite
        UNIQUE (user_id, listing_id)
) ENGINE=InnoDB;

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_listing ON favorites(listing_id);



CREATE TABLE rental_earnings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    owner_id INT UNSIGNED NOT NULL,
    booking_id INT UNSIGNED NULL,

    description VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    rental_date DATE NOT NULL,

    status ENUM('pending', 'Completed', 'Paid')
        NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_earnings_owner
        FOREIGN KEY (owner_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_earnings_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_earnings_owner ON rental_earnings(owner_id);
CREATE INDEX idx_earnings_date ON rental_earnings(rental_date);
CREATE INDEX idx_earnings_status ON rental_earnings(status);



SHOW TABLES;

DESCRIBE users;
DESCRIBE listings;
DESCRIBE bookings;
DESCRIBE favorites;
DESCRIBE rental_earnings;

-- ============================================================
-- OPTIONAL DEVELOPMENT TEST DATA
-- ============================================================
-- DO NOT insert a fake password hash unless you know the
-- corresponding password. Create an owner through the Signup page.
--
-- After you sign up as an owner, use:
--
-- SELECT id, name, email, role FROM users;
--
-- Then use that owner's ID for the test earnings/listing inserts
-- below if needed.
-- ============================================================
