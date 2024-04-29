package com.estate.back.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// 이메일 인증 확인 Request Body DTO

@Getter
@Setter
@NoArgsConstructor
public class EmailAuthCheckRequestDto {
    @NotBlank
    private String userEmail;
    @NotBlank
    private String authNumber;
}
