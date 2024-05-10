package com.estate.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estate.back.dto.response.estate.GetLocalDataResponseDto;
import com.estate.back.service.EstateService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/estate")
@RequiredArgsConstructor
public class EstateController {
    
    private final EstateService estateService;

    @GetMapping("/local/{local}")
    public ResponseEntity<? super GetLocalDataResponseDto> getLocalData (
        @PathVariable("local") String local
    ) {
        ResponseEntity<? super GetLocalDataResponseDto> response = estateService.getLocalData(local);
        return response;
    }

}
