package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.Location;
import com.tours.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*")
public class LocationController {
    
    @Autowired
    private LocationRepository locationRepository;
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Location>> addLocation(@RequestBody Location location) {
        Location savedLocation = locationRepository.save(location);
        return ResponseEntity.ok(ApiResponse.success("Location added successfully", savedLocation));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Location>>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Locations fetched successfully", locations));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Location>> updateLocation(@PathVariable Long id, @RequestBody Location location) {
        location.setId(id);
        Location updatedLocation = locationRepository.save(location);
        return ResponseEntity.ok(ApiResponse.success("Location updated successfully", updatedLocation));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLocation(@PathVariable Long id) {
        locationRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Location deleted successfully"));
    }
}