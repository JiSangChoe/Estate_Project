package com.estate.back.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.BoardEntity;

@Repository
// estate 데이터베이스의 board 테이블 작업을 위한 레포지토리
public interface BoardRepository extends JpaRepository<BoardEntity, Integer>{
    
    List<BoardEntity> findByOrderByReceptionNumberDesc();
    // contains / Containing / IsContaining => LIKE '%word%'
    // StartingWith => LIKE 'word%'
    // EndingWith => LIKE '%word'
    List<BoardEntity> findByTitleContainsOrderByReceptionNumberDesc(String title);
    // List로 받을수 있지만 정확하게 하기 위해서 받는 타입을 BoardEntity로 받음
    BoardEntity findByReceptionNumber(Integer receptionNumber);
}
