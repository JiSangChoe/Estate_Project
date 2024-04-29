package com.estate.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// estate 데이터베이스의 board 테이블과 매핑되는 Entity 클래스
@Entity(name = "board")
@Table(name = "board")
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer receptionNumber;
    private Boolean status;
    private String title;
    private String content;
    private String writerId;
    private String writeDatetime;
    private Integer viewCount;
    private String comment;
}
