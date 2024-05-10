package com.estate.back.service;

import org.springframework.http.ResponseEntity;

import com.estate.back.dto.response.estate.GetLocalDataResponseDto;

public interface EstateService {
    
    ResponseEntity<? super GetLocalDataResponseDto> getLocalData(String local); 
}
