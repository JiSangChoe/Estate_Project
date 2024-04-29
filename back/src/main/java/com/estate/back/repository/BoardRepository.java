package com.estate.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.estate.back.entity.BoardEntity;

// estate 데이터베이스의 board 테이블 작업을 위한 레포지토리
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{
    
}
