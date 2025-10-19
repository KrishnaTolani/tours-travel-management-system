package com.tours.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "tour_id")
    private Tour tour;
    
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;
    
    private Integer ticketsBooked;
    private Double totalAmount;
    
    @Enumerated(EnumType.STRING)
    private Status status = Status.CONFIRMED;
    
    @Column(name = "booking_date")
    private LocalDateTime bookingDate = LocalDateTime.now();
    
    private String bookingId;
    
    public enum Status {
        CONFIRMED, CANCELLED, PENDING
    }
    
    public Booking() {}
    
    public Booking(Tour tour, User customer, Integer ticketsBooked, Double totalAmount) {
        this.tour = tour;
        this.customer = customer;
        this.ticketsBooked = ticketsBooked;
        this.totalAmount = totalAmount;
        this.bookingId = "BK" + System.currentTimeMillis();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Tour getTour() { return tour; }
    public void setTour(Tour tour) { this.tour = tour; }
    
    public User getCustomer() { return customer; }
    public void setCustomer(User customer) { this.customer = customer; }
    
    public Integer getTicketsBooked() { return ticketsBooked; }
    public void setTicketsBooked(Integer ticketsBooked) { this.ticketsBooked = ticketsBooked; }
    
    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    
    public LocalDateTime getBookingDate() { return bookingDate; }
    public void setBookingDate(LocalDateTime bookingDate) { this.bookingDate = bookingDate; }
    
    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }
}