DROP DATABASE IF EXISTS rentosphere;
CREATE DATABASE rentosphere
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE rentosphere;


-- ============================================================
-- 1. USERS
-- ============================================================

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


-- ============================================================
-- 2. LISTINGS
-- ============================================================

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
-- 7. PRODUCTS
-- ============================================================
-- NOTE: this is a separate, static catalogue table used by the
-- /api/products route (src/models/product.js) and the Browse
-- page. Bookings reference THIS table (see below), not listings.

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    category VARCHAR(50),
    price_per_day DECIMAL(10,2),
    location VARCHAR(100),
    description TEXT,
    image_url VARCHAR(255),
    status ENUM('Pending Inspection', 'Safety Verified')
        DEFAULT 'Pending Inspection'
);


-- ============================================================
-- 3. BOOKINGS
-- ============================================================
-- NOTE: listing_id here actually stores a products.id, not a
-- listings.id -- that's how bookingController.js/Booking.js are
-- written (they book against the Browse-page products catalogue).

CREATE TABLE bookings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    listing_id INT NOT NULL,
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

    CONSTRAINT fk_bookings_product
        FOREIGN KEY (listing_id)
        REFERENCES products(id)
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


-- ============================================================
-- 4. FAVORITES
-- ============================================================

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


-- ============================================================
-- 5. RENTAL EARNINGS
-- ============================================================

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


-- ============================================================
-- 6. OWNER APPLICATIONS
-- ============================================================
-- One application per user (a resubmission updates the existing
-- row and resets it to 'pending' rather than creating a new one).
-- Reviewed by an admin via /api/owner-applications/:id/approve
-- or /reject, which is what flips a user's ownerStatus to
-- 'approved' and unlocks the owner dashboard in the frontend.

CREATE TABLE owner_applications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL,

    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,

    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,

    bank_name VARCHAR(100) NOT NULL,
    account_holder VARCHAR(150) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    account_type VARCHAR(30) NOT NULL,
    branch_code VARCHAR(20) NOT NULL,

    status ENUM('pending', 'approved', 'rejected')
        NOT NULL DEFAULT 'pending',

    reviewed_by INT UNSIGNED NULL,
    reviewed_at DATETIME NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_owner_app_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_owner_app_reviewer
        FOREIGN KEY (reviewed_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    CONSTRAINT unique_owner_application_user
        UNIQUE (user_id)
) ENGINE=InnoDB;

CREATE INDEX idx_owner_app_status ON owner_applications(status);


-- ============================================================
-- 8. PAYMENTS (PayFast integration)
-- ============================================================

CREATE TABLE payments (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    m_payment_id VARCHAR(64) NOT NULL UNIQUE,
    pf_payment_id VARCHAR(100) NULL,

    renter_id INT UNSIGNED NOT NULL,
    amount DECIMAL(10,2) NOT NULL,

    status ENUM(
        'pending',
        'complete',
        'failed',
        'cancelled'
    ) NOT NULL DEFAULT 'pending',

    raw_itn JSON NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_renter
        FOREIGN KEY (renter_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_payments_renter ON payments(renter_id);


CREATE TABLE payment_bookings (
    payment_id INT UNSIGNED NOT NULL,
    booking_id INT UNSIGNED NOT NULL,

    PRIMARY KEY (payment_id, booking_id),

    CONSTRAINT fk_pb_payment
        FOREIGN KEY (payment_id)
        REFERENCES payments(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pb_booking
        FOREIGN KEY (booking_id)
        REFERENCES bookings(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;


SHOW TABLES;

DESCRIBE users;
DESCRIBE listings;
DESCRIBE products;
DESCRIBE bookings;
DESCRIBE favorites;
DESCRIBE rental_earnings;
DESCRIBE owner_applications;
DESCRIBE payments;
DESCRIBE payment_bookings;


-- ============================================================
-- ADMIN USER
-- ============================================================

INSERT INTO users (name, email, password_hash, role)
VALUES (
    'Caleb Johnson',
    'calebneojohnson@gmail.com',
    '$2b$10$SGuBgo9U/HiDtobaoHBWO.p7smHFIZgDkkxHkM9LsQpNllqbH.fA.',
    'admin'
);


-- ============================================================
-- PRODUCTS SEED DATA
-- ============================================================

INSERT INTO products (title, category, price_per_day, location, description, image_url, status) VALUES
('White Wedding Arch', 'Weddings', 850, 'Cape Town', 'Metal flower arch', '/products/weddings/wedding arch.jpg', 'Safety Verified'),
('Tables', 'Weddings', 1200, 'Stellenbosch', '150 guest seating', '/products/weddings/wedding-tables.jpg', 'Safety Verified'),
('Fairy Lights', 'Weddings', 450, 'Paarl', 'Warm white LED', '/products/weddings/wedding-lights.jpg', 'Safety Verified'),
('Jumping Castle', 'Birthdays & Parties', 600, 'Bellville', 'Kids party jumping castle', '/products/birthdays/castle-for-birthday-parties.jpg', 'Safety Verified'),
('Sound System', 'Birthdays & Parties', 750, 'Cape Town', 'Sound system set for the party', '/products/birthdays/sound-system.jpg', 'Safety Verified'),
('Braai/ Barberque set', 'Birthdays & Parties', 250, 'Milnerton', 'Large braai for parties', '/products/birthdays/braai-barbeque.jpg', 'Safety Verified'),
('Camping tent', 'Outdoor & Camping', 280, 'Somerset West', 'Waterproof tent', '/products/outdoor/tent.jpg', 'Safety Verified'),
('Cooler Box', 'Outdoor & Camping', 120, 'Cape Town', 'Convenient way of keeping ice stored for the longest', '/products/outdoor/cooler.jpg', 'Safety Verified'),
('Camp chairs set', 'Outdoor & Camping', 300, 'Durbanville', 'Foldable chairs and table', '/products/outdoor/camping-chairs.jpg', 'Safety Verified'),
('Venter Trailer', 'Moving & Home', 350, 'Cape Town', 'Licensed, braked', '/products/moving/trailer.jpg', 'Safety Verified'),
('Furniture Dolly', 'Moving & Home', 150, 'Epping', 'Heavy duty dolly', '/products/moving/dolly-diy.jpg', 'Safety Verified'),
('Gasoline', 'Moving & Home', 100, 'Bellville', 'Gasoline to refuel', '/products/moving/gasoline.jpg', 'Safety Verified'),
('Drill kit', 'DIY & Projects', 250, 'Bellville', 'Drill set with batteries', '/products/diy/drill-set.jpg', 'Safety Verified'),
('Grinder', 'DIY & Projects', 220, 'Montague Gardens', 'grinder', '/products/diy/grinder.jpg', 'Safety Verified'),
('Concrete Mixer', 'DIY & Projects', 550, 'Brackenfell', 'concrete mixer', '/products/diy/mixer.jpg', 'Safety Verified'),
('Backdrop stand', 'Graduations', 500, 'Claremont', 'Backdrop', '/products/graduations/backdrop.jpg', 'Safety Verified'),
('Marquee', 'Graduations', 800, 'Khayelitsha', 'Marquee for graduation ceremony', '/products/graduations/marquee.jpg', 'Safety Verified');