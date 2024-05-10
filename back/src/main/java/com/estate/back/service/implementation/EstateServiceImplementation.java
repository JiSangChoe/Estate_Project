package com.estate.back.service.implementation;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.estate.GetLocalDataResponseDto;
import com.estate.back.repository.EstateRepository;
import com.estate.back.service.EstateService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EstateServiceImplementation implements EstateService{
    
    private final EstateRepository estateRepository;

    @Override
    public ResponseEntity<? super GetLocalDataResponseDto> getLocalData(String local) {
        
        try {

            

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return GetLocalDataResponseDto.success(null);
    }
}
