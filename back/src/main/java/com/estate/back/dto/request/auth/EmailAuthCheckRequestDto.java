package com.estate.back.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 이메일 인증 확인 Request Body DTO

@Getter
@NoArgsConstructor
public class EmailAuthCheckRequestDto {

    @NotBlank
    private String userEmail;

    @NotBlank
    private String authNumber;
}
