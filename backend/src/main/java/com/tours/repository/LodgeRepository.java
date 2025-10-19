package com.tours.repository;

import com.tours.entity.Lodge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LodgeRepository extends JpaRepository<Lodge, Long> {
}