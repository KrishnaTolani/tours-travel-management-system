package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.Booking;
import com.tours.entity.User;
import com.tours.service.BookingService;
import com.tours.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/book")
    public ResponseEntity<ApiResponse<Booking>> bookTour(
            @RequestParam Long tourId,
            @RequestParam Long customerId,
            @RequestParam Integer tickets) {
        try {
            Booking booking = bookingService.bookTour(tourId, customerId, tickets);
            return ResponseEntity.ok(ApiResponse.success("Tour booked successfully", booking));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Booking>>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully", bookings));
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookingsByCustomer(@PathVariable Long customerId) {
        Optional<User> customer = userService.getUserById(customerId);
        if (customer.isPresent()) {
            List<Booking> bookings = bookingService.getBookingsByCustomer(customer.get());
            return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully", bookings));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error("Customer not found"));
    }
    
    @GetMapping("/guide/{guideId}")
    public ResponseEntity<ApiResponse<List<Booking>>> getBookingsByGuide(@PathVariable Long guideId) {
        Optional<User> guide = userService.getUserById(guideId);
        if (guide.isPresent()) {
            List<Booking> bookings = bookingService.getBookingsByTourGuide(guide.get());
            return ResponseEntity.ok(ApiResponse.success("Bookings fetched successfully", bookings));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error("Tour guide not found"));
    }
}