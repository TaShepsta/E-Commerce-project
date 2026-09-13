create database rentosphere;
use rentosphere;

create table products (
id int auto_increment primary key,
title varchar(255),
category varchar(50),
price_per_day decimal(10,2),
location varchar(100),
description text,
image_url varchar(255),
status enum('Pending Inspection', 'Safety Verified') default 'Pending Inspection'
);

insert into products ( title, category, price_per_day, location, description, image_url, status) values
('White Wedding Arch', 'Weddings', 850, 'Cape Town', 'Metal flower arch','/products/weddings/wedding arch.jpg', 'Safety Verified'),
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
('Marquee', 'Graduations', 800, 'Khayelitsha', 'Marquee for graduation ceremony', '/products/graduations/marquee.jpg', 'Safety Verified')  

