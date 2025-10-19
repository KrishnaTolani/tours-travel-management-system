package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.Transport;
import com.tours.repository.TransportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transports")
@CrossOrigin(origins = "*")
public class TransportController {
    
    @Autowired
    private TransportRepository transportRepository;
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Transport>> addTransport(@RequestBody Transport transport) {
        Transport savedTransport = transportRepository.save(transport);
        return ResponseEntity.ok(ApiResponse.success("Transport added successfully", savedTransport));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Transport>>> getAllTransports() {
        List<Transport> transports = transportRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Transports fetched successfully", transports));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Transport>> updateTransport(@PathVariable Long id, @RequestBody Transport transport) {
        transport.setId(id);
        Transport updatedTransport = transportRepository.save(transport);
        return ResponseEntity.ok(ApiResponse.success("Transport updated successfully", updatedTransport));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTransport(@PathVariable Long id) {
        transportRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Transport deleted successfully"));
    }
}