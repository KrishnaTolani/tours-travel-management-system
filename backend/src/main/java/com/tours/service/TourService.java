package com.tours.service;

import com.tours.entity.Tour;
import com.tours.entity.User;
import com.tours.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TourService {
    
    @Autowired
    private TourRepository tourRepository;
    
    public Tour addTour(Tour tour) {
        return tourRepository.save(tour);
    }
    
    public List<Tour> getAllActiveTours() {
        return tourRepository.findByStatus(Tour.Status.ACTIVE);
    }
    
    public List<Tour> getToursByGuide(User tourGuide) {
        return tourRepository.findByTourGuide(tourGuide);
    }
    
    public List<Tour> searchTours(String search) {
        if (search == null || search.trim().isEmpty()) {
            return getAllActiveTours();
        }
        return tourRepository.searchTours(search.trim());
    }
    
    public Optional<Tour> getTourById(Long id) {
        return tourRepository.findById(id);
    }
    
    public Tour updateTour(Tour tour) {
        return tourRepository.save(tour);
    }
    
    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }
}