ALTER TABLE bookings
    MODIFY listing_id INT NOT NULL;

ALTER TABLE bookings
    ADD CONSTRAINT fk_bookings_product
        FOREIGN KEY (listing_id)
        REFERENCES products(id)
        ON DELETE CASCADE;