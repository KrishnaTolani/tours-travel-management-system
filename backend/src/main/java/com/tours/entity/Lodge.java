package com.tours.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lodges")
public class Lodge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String type;
    
    private String description;
    
    public Lodge() {}
    
    public Lodge(String type, String description) {
        this.type = type;
        this.description = description;
    }
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}