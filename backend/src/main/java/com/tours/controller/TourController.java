package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.Tour;
import com.tours.entity.User;
import com.tours.service.TourService;
import com.tours.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tours")
@CrossOrigin(origins = "*")
public class TourController {
    
    @Autowired
    private TourService tourService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Tour>> addTour(@RequestBody Tour tour) {
        Tour savedTour = tourService.addTour(tour);
        return ResponseEntity.ok(ApiResponse.success("Tour added successfully", savedTour));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Tour>>> getAllTours() {
        List<Tour> tours = tourService.getAllActiveTours();
        return ResponseEntity.ok(ApiResponse.success("Tours fetched successfully", tours));
    }
    
    @GetMapping("/guide/{guideId}")
    public ResponseEntity<ApiResponse<List<Tour>>> getToursByGuide(@PathVariable Long guideId) {
        Optional<User> guide = userService.getUserById(guideId);
        if (guide.isPresent()) {
            List<Tour> tours = tourService.getToursByGuide(guide.get());
            return ResponseEntity.ok(ApiResponse.success("Tours fetched successfully", tours));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error("Tour guide not found"));
    }
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Tour>>> searchTours(@RequestParam(required = false) String query) {
        List<Tour> tours = tourService.searchTours(query);
        return ResponseEntity.ok(ApiResponse.success("Tours fetched successfully", tours));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Tour>> getTourById(@PathVariable Long id) {
        Optional<Tour> tour = tourService.getTourById(id);
        if (tour.isPresent()) {
            return ResponseEntity.ok(ApiResponse.success("Tour fetched successfully", tour.get()));
        }
        return ResponseEntity.badRequest().body(ApiResponse.error("Tour not found"));
    }
}