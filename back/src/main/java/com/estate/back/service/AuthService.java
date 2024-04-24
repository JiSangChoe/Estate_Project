package com.estate.back.service;

import org.springframework.http.ResponseEntity;

import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.response.ResponseDto;

public interface AuthService {
    ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto);
}
