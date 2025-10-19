package com.tours.service;

import com.tours.entity.Booking;
import com.tours.entity.Tour;
import com.tours.entity.User;
import com.tours.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private TourService tourService;
    
    public Booking bookTour(Long tourId, Long customerId, Integer tickets) {
        Tour tour = tourService.getTourById(tourId)
            .orElseThrow(() -> new RuntimeException("Tour not found"));
        
        if (tour.getAvailableTickets() < tickets) {
            throw new RuntimeException("Not enough tickets available");
        }
        
        User customer = new User();
        customer.setId(customerId);
        
        Double totalAmount = tour.getTicketPrice() * tickets;
        Booking booking = new Booking(tour, customer, tickets, totalAmount);
        
        // Update available tickets
        tour.setAvailableTickets(tour.getAvailableTickets() - tickets);
        tourService.updateTour(tour);
        
        return bookingRepository.save(booking);
    }
    
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    public List<Booking> getBookingsByCustomer(User customer) {
        return bookingRepository.findByCustomer(customer);
    }
    
    public List<Booking> getBookingsByTourGuide(User tourGuide) {
        return bookingRepository.findByTourTourGuide(tourGuide);
    }
}