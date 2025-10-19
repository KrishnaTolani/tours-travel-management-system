package com.tours.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tours")
public class Tour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    
    @ManyToOne
    @JoinColumn(name = "from_location_id")
    private Location fromLocation;
    
    @ManyToOne
    @JoinColumn(name = "to_location_id")
    private Location toLocation;
    
    @ManyToOne
    @JoinColumn(name = "tour_guide_id")
    private User tourGuide;
    
    @ManyToOne
    @JoinColumn(name = "transport_id")
    private Transport transport;
    
    @ManyToOne
    @JoinColumn(name = "lodge_id")
    private Lodge lodge;
    
    private String lodgeName;
    private String lodgingAddress;
    private String transportDescription;
    private String vehicleRegistration;
    private Integer totalDays;
    private Integer availableTickets;
    private Integer totalTickets;
    private Double ticketPrice;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String tourImage;
    private String specialNote;
    private String activities;
    private String meals;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;
    
    public enum Status {
        ACTIVE, INACTIVE
    }
    
    public Tour() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Location getFromLocation() { return fromLocation; }
    public void setFromLocation(Location fromLocation) { this.fromLocation = fromLocation; }
    
    public Location getToLocation() { return toLocation; }
    public void setToLocation(Location toLocation) { this.toLocation = toLocation; }
    
    public User getTourGuide() { return tourGuide; }
    public void setTourGuide(User tourGuide) { this.tourGuide = tourGuide; }
    
    public Transport getTransport() { return transport; }
    public void setTransport(Transport transport) { this.transport = transport; }
    
    public Lodge getLodge() { return lodge; }
    public void setLodge(Lodge lodge) { this.lodge = lodge; }
    
    public String getLodgeName() { return lodgeName; }
    public void setLodgeName(String lodgeName) { this.lodgeName = lodgeName; }
    
    public String getLodgingAddress() { return lodgingAddress; }
    public void setLodgingAddress(String lodgingAddress) { this.lodgingAddress = lodgingAddress; }
    
    public String getTransportDescription() { return transportDescription; }
    public void setTransportDescription(String transportDescription) { this.transportDescription = transportDescription; }
    
    public String getVehicleRegistration() { return vehicleRegistration; }
    public void setVehicleRegistration(String vehicleRegistration) { this.vehicleRegistration = vehicleRegistration; }
    
    public Integer getTotalDays() { return totalDays; }
    public void setTotalDays(Integer totalDays) { this.totalDays = totalDays; }
    
    public Integer getAvailableTickets() { return availableTickets; }
    public void setAvailableTickets(Integer availableTickets) { this.availableTickets = availableTickets; }
    
    public Integer getTotalTickets() { return totalTickets; }
    public void setTotalTickets(Integer totalTickets) { this.totalTickets = totalTickets; }
    
    public Double getTicketPrice() { return ticketPrice; }
    public void setTicketPrice(Double ticketPrice) { this.ticketPrice = ticketPrice; }
    
    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    
    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    
    public String getTourImage() { return tourImage; }
    public void setTourImage(String tourImage) { this.tourImage = tourImage; }
    
    public String getSpecialNote() { return specialNote; }
    public void setSpecialNote(String specialNote) { this.specialNote = specialNote; }
    
    public String getActivities() { return activities; }
    public void setActivities(String activities) { this.activities = activities; }
    
    public String getMeals() { return meals; }
    public void setMeals(String meals) { this.meals = meals; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}