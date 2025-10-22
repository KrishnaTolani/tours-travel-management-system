package com.tours.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.tours.entity.User;
import com.tours.entity.Booking;
import com.tours.entity.Tour;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendTourGuideCredentials(User tourGuide, String password) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(tourGuide.getEmail());
            message.setSubject("Welcome to Tours & Travel - Your Login Credentials");
            message.setText(
                "Dear " + tourGuide.getName() + ",\n\n" +
                "Welcome to Tours & Travel! You have been registered as a Tour Guide.\n\n" +
                "Your login credentials are:\n" +
                "Email: " + tourGuide.getEmail() + "\n" +
                "Password: " + password + "\n\n" +
                "Please login to your dashboard at: http://localhost:5174\n\n" +
                "Best regards,\n" +
                "Tours & Travel Team"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send email to tour guide: " + e.getMessage());
        }
    }

    public void sendBookingConfirmation(User customer, Booking booking, Tour tour) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(customer.getEmail());
            message.setSubject("Booking Confirmation - Tours & Travel");
            message.setText(
                "Dear " + customer.getName() + ",\n\n" +
                "Your tour booking has been confirmed!\n\n" +
                "Booking Details:\n" +
                "Booking ID: " + booking.getBookingId() + "\n" +
                "Tour: " + tour.getName() + "\n" +
                "Tickets: " + booking.getTicketsBooked() + "\n" +
                "Total Amount: ₹" + booking.getTotalAmount() + "\n" +
                "Status: " + booking.getStatus() + "\n\n" +
                "Tour Details:\n" +
                "From: " + (tour.getFromLocation() != null ? tour.getFromLocation().getName() : "N/A") + "\n" +
                "To: " + (tour.getToLocation() != null ? tour.getToLocation().getName() : "N/A") + "\n" +
                "Duration: " + tour.getTotalDays() + " days\n" +
                "Guide: " + (tour.getTourGuide() != null ? tour.getTourGuide().getName() : "N/A") + "\n\n" +
                "Thank you for choosing Tours & Travel!\n\n" +
                "Best regards,\n" +
                "Tours & Travel Team"
            );
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send booking confirmation email: " + e.getMessage());
        }
    }
}