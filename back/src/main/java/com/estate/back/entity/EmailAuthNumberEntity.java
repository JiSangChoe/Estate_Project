package com.estate.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Estate 데이터베이스의 email_auth_number 테이블과 매핑되는 Entity 클래스
@Entity(name="emailAuthNumber")
@Table(name="email_auth_number")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailAuthNumberEntity {
    @Id
    private String email;
    private String authNumber;
}
