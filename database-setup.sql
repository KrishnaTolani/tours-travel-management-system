-- Tours and Travel Management System Database Setup
-- Run this script in MySQL to set up the database manually (optional)

-- Create database
CREATE DATABASE IF NOT EXISTS tours_travel_db;
USE tours_travel_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    role ENUM('ADMIN', 'TOUR_GUIDE', 'CUSTOMER') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create transports table
CREATE TABLE IF NOT EXISTS transports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create lodges table
CREATE TABLE IF NOT EXISTS lodges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    from_location_id BIGINT,
    to_location_id BIGINT,
    tour_guide_id BIGINT,
    transport_id BIGINT,
    lodge_id BIGINT,
    lodge_name VARCHAR(255),
    lodging_address TEXT,
    transport_description TEXT,
    vehicle_registration VARCHAR(100),
    total_days INT,
    available_tickets INT,
    total_tickets INT,
    ticket_price DECIMAL(10,2),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    tour_image TEXT,
    special_note TEXT,
    activities TEXT,
    meals TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE',
    FOREIGN KEY (from_location_id) REFERENCES locations(id),
    FOREIGN KEY (to_location_id) REFERENCES locations(id),
    FOREIGN KEY (tour_guide_id) REFERENCES users(id),
    FOREIGN KEY (transport_id) REFERENCES transports(id),
    FOREIGN KEY (lodge_id) REFERENCES lodges(id)
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT,
    customer_id BIGINT,
    tickets_booked INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('CONFIRMED', 'CANCELLED', 'PENDING') DEFAULT 'CONFIRMED',
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    booking_id VARCHAR(50) UNIQUE,
    FOREIGN KEY (tour_id) REFERENCES tours(id),
    FOREIGN KEY (customer_id) REFERENCES users(id)
);

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO users (name, email, password, phone, address, role) VALUES 
('Default Admin', 'admin@tours.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '1234567890', 'Admin Address', 'ADMIN');

-- Insert sample locations
INSERT IGNORE INTO locations (name, description) VALUES 
('Mumbai', 'Financial capital of India, known for Bollywood and business'),
('Delhi', 'Capital city of India, rich in history and culture'),
('Kerala', 'Gods own country, known for backwaters and spices'),
('Goa', 'Beach destination with Portuguese heritage'),
('Rajasthan', 'Land of kings, known for palaces and deserts');

-- Insert sample transports
INSERT IGNORE INTO transports (name, description) VALUES 
('Bus', 'Comfortable AC buses for road travel'),
('Train', 'Indian Railways connectivity across the country'),
('Flight', 'Quick air travel for long distances'),
('Car', 'Private car rentals for flexible travel');

-- Insert sample lodges
INSERT IGNORE INTO lodges (type, description) VALUES 
('Hotel', 'Comfortable hotel accommodations'),
('Villa', 'Private villa stays for groups'),
('Bungalow', 'Cozy bungalows in scenic locations'),
('Resort', 'Full-service resorts with amenities');

-- Sample tour guide (password: guide123)
INSERT IGNORE INTO users (name, email, password, phone, address, role) VALUES 
('Rohit Traveller', 'rohit@tours.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '9876543210', 'Mumbai, Maharashtra', 'TOUR_GUIDE');

-- Sample customer (password: customer123)
INSERT IGNORE INTO users (name, email, password, phone, address, role) VALUES 
('Sachin Thakur', 'sachin@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', '8765432109', 'Pune, Maharashtra', 'CUSTOMER');

-- Sample tour
INSERT IGNORE INTO tours (
    name, description, from_location_id, to_location_id, tour_guide_id, 
    transport_id, lodge_id, lodge_name, lodging_address, transport_description,
    vehicle_registration, total_days, available_tickets, total_tickets, 
    ticket_price, start_date, end_date, tour_image, special_note, 
    activities, meals, status
) VALUES (
    'Historical Journey', 
    'Explore the rich history and culture of Delhi to Mumbai',
    2, 1, 2, 2, 1,
    'Heritage Hotel Mumbai',
    'Near Gateway of India, Mumbai',
    'First we will board the train from Delhi station, then reach Mumbai Central',
    'TRN12345',
    3, 48, 50,
    13000.00,
    '2024-07-07 08:00:00',
    '2024-07-10 21:00:00',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Please reach the station 30 minutes before departure',
    'City tour, Historical monuments visit, Local cuisine tasting',
    'Breakfast, Lunch, Dinner included',
    'ACTIVE'
);

-- Sample booking
INSERT IGNORE INTO bookings (
    tour_id, customer_id, tickets_booked, total_amount, 
    status, booking_id
) VALUES (
    1, 3, 2, 26000.00, 'CONFIRMED', 'BK1234567890'
);

COMMIT;