package com.tours.repository;

import com.tours.entity.Tour;
import com.tours.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<Tour, Long> {
    List<Tour> findByStatus(Tour.Status status);
    List<Tour> findByTourGuide(User tourGuide);
    
    @Query("SELECT t FROM Tour t WHERE t.status = 'ACTIVE' AND " +
           "(LOWER(t.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.fromLocation.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(t.toLocation.name) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Tour> searchTours(@Param("search") String search);
}