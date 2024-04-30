package com.estate.back.service;

import org.springframework.http.ResponseEntity;

import com.estate.back.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
    
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser (String userId);

}
