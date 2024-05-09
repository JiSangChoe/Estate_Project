package com.estate.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.EstateEntity;

@Repository
public interface EstateRepository extends JpaRepository<EstateEntity, Integer>{
    
}
