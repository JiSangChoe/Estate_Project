package com.estate.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.EmailAuthNumberEntity;

// estate 데이터베이스의 email_auth_number 테이블 작업을 위한 리포지토리
@Repository
public interface EmailAuthNumberRepository extends JpaRepository<EmailAuthNumberEntity, String> {
    
}
