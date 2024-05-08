package com.estate.back.entity;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.request.board.PutBoardRequestDto;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// estate 데이터베이스의 board 테이블과 매핑되는 Entity 클래스
@Entity(name="board")
@Table(name="board")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BoardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer receptionNumber;
    private Boolean status;
    private String title;
    private String contents;
    private String writerId;
    private String writeDatetime;
    private Integer viewCount;
    private String comment;

    public BoardEntity(PostBoardRequestDto dto, String userId) {
        // 현재 시간에 대한 패키지와 코드
        Date now = Date.from(Instant.now());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String writeDatetime = simpleDateFormat.format(now);

        this.status = false;
        this.title = dto.getTitle();
        this.contents = dto.getContents();
        this.writerId = userId;
        this.writeDatetime = writeDatetime;
        this.viewCount = 0;
    }

    public void increaseViewCount() {
        this.viewCount++;
    }

    public void update(PutBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.contents =dto.getContents();
    }
}
