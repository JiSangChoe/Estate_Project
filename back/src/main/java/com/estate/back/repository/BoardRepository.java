package com.estate.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.BoardEntity;

// estate 데이터베이스의 board 테이블의 작업을 위한 리포지토리
@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    
}
