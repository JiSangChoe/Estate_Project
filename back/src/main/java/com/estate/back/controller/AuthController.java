package com.estate.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

// Auth 모듈 컨트롤러 : /api/v1/auth

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    
    @PostMapping("/id-check")
    public ResponseEntity<ResponseDto> idCheck (
        @RequestBody @Valid IdCheckRequestDto requestBody
        ) {
        ResponseEntity<ResponseDto> response = authService.idCheck(requestBody);
        return response;
    } 
}
