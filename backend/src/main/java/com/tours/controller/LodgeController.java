package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.Lodge;
import com.tours.repository.LodgeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lodges")
@CrossOrigin(origins = "*")
public class LodgeController {
    
    @Autowired
    private LodgeRepository lodgeRepository;
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Lodge>> addLodge(@RequestBody Lodge lodge) {
        Lodge savedLodge = lodgeRepository.save(lodge);
        return ResponseEntity.ok(ApiResponse.success("Lodge added successfully", savedLodge));
    }
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Lodge>>> getAllLodges() {
        List<Lodge> lodges = lodgeRepository.findAll();
        return ResponseEntity.ok(ApiResponse.success("Lodges fetched successfully", lodges));
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<Lodge>> updateLodge(@PathVariable Long id, @RequestBody Lodge lodge) {
        lodge.setId(id);
        Lodge updatedLodge = lodgeRepository.save(lodge);
        return ResponseEntity.ok(ApiResponse.success("Lodge updated successfully", updatedLodge));
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteLodge(@PathVariable Long id) {
        lodgeRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success("Lodge deleted successfully"));
    }
}