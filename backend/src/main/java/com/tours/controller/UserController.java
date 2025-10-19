package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.entity.User;
import com.tours.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        users.forEach(user -> user.setPassword(null)); // Don't send passwords
        return ResponseEntity.ok(ApiResponse.success("Users fetched successfully", users));
    }
    
    @GetMapping("/customers")
    public ResponseEntity<ApiResponse<List<User>>> getAllCustomers() {
        List<User> customers = userService.getUsersByRole(User.Role.CUSTOMER);
        customers.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(ApiResponse.success("Customers fetched successfully", customers));
    }
    
    @GetMapping("/guides")
    public ResponseEntity<ApiResponse<List<User>>> getAllTourGuides() {
        List<User> guides = userService.getUsersByRole(User.Role.TOUR_GUIDE);
        guides.forEach(user -> user.setPassword(null));
        return ResponseEntity.ok(ApiResponse.success("Tour guides fetched successfully", guides));
    }
}