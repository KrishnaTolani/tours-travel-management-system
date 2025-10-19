package com.tours.service;

import com.tours.entity.User;
import com.tours.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostConstruct
    public void createDefaultAdmin() {
        try {
            if (!userRepository.existsByEmail("admin@tours.com")) {
                User admin = new User();
                admin.setName("Default Admin");
                admin.setEmail("admin@tours.com");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setPhone("1234567890");
                admin.setAddress("Admin Address");
                admin.setRole(User.Role.ADMIN);
                User savedAdmin = userRepository.save(admin);
                System.out.println("Default admin created: " + savedAdmin.getEmail());
            } else {
                System.out.println("Default admin already exists");
            }
        } catch (Exception e) {
            System.out.println("Error creating default admin: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    
    public Optional<User> loginUser(String email, String password, String role) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword()) 
            && user.get().getRole().name().equals(role)) {
            return user;
        }
        return Optional.empty();
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}