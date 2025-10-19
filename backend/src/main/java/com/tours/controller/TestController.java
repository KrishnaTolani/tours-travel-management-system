package com.tours.controller;

import com.tours.entity.User;
import com.tours.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175"})
public class TestController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin() {
        try {
            User admin = new User();
            admin.setName("Test Admin");
            admin.setEmail("admin@tours.com");
            admin.setPassword("admin123");
            admin.setPhone("1234567890");
            admin.setAddress("Admin Address");
            admin.setRole(User.Role.ADMIN);
            
            User savedAdmin = userService.registerUser(admin);
            return ResponseEntity.ok("Admin created: " + savedAdmin.getEmail());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    
    @GetMapping("/check-admin")
    public ResponseEntity<String> checkAdmin() {
        try {
            var user = userService.loginUser("admin@tours.com", "admin123", "ADMIN");
            if (user.isPresent()) {
                return ResponseEntity.ok("Admin exists and login works");
            } else {
                return ResponseEntity.ok("Admin login failed");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}