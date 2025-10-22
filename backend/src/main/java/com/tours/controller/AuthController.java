package com.tours.controller;

import com.tours.dto.ApiResponse;
import com.tours.dto.LoginRequest;
import com.tours.entity.User;
import com.tours.service.UserService;
import com.tours.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<User>> register(@RequestBody User user) {
        try {
            String plainPassword = user.getPassword(); // Store plain password before encoding
            User registeredUser = userService.registerUser(user);
            
            // Send email if user is a tour guide
            if ("TOUR_GUIDE".equals(registeredUser.getRole().toString())) {
                emailService.sendTourGuideCredentials(registeredUser, plainPassword);
            }
            
            return ResponseEntity.ok(ApiResponse.success("User registered successfully", registeredUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<User>> login(@RequestBody LoginRequest loginRequest) {
        Optional<User> user = userService.loginUser(
            loginRequest.getEmail(), 
            loginRequest.getPassword(), 
            loginRequest.getRole()
        );
        
        if (user.isPresent()) {
            User loggedInUser = user.get();
            loggedInUser.setPassword(null); // Don't send password back
            return ResponseEntity.ok(ApiResponse.success("Login successful", loggedInUser));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid credentials"));
        }
    }
}