-- PayFast integration migration.
-- Run this once against your existing `rentosphere` database:
--   mysql -u root -p rentosphere < backend/database/migration_payfast.sql

CREATE TABLE IF NOT EXISTS payments (
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
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payments_renter
        FOREIGN KEY (renter_id)
        REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS payment_bookings (
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

CREATE INDEX idx_payments_renter ON payments(renter_id);
