package com.estate.back.entity;

import com.estate.back.dto.request.auth.SignUpRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// estate 데이터베이스의 user 테이블과 매핑되는 Entity 클래스
@Entity(name="user")
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    private String userId;
    private String userPassword;
    private String userEmail;
    private String userRole;
    private String joinPath;

    public UserEntity (SignUpRequestDto dto) {
        this.userId = dto.getUserId();
        this.userPassword = dto.getUserPassword();
        this.userEmail = dto.getUserEmail();
        this.userRole = "ROLE_USER";
        this.joinPath = "HOME";
    }
}