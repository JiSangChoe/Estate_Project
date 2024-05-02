package com.estate.back.common.object;

import java.text.SimpleDateFormat;
import java.util.Date;
import com.estate.back.entity.BoardEntity;
import java.util.List;

import org.springframework.security.access.method.P;

import java.util.ArrayList;

import lombok.Getter;

@Getter
public class BoardListItem {
    private Integer receptionNumber;
    private boolean status;
    private String title;
    private String writerId;
    private String writeDatetime;
    private Integer viewCount;

    private BoardListItem(BoardEntity boardEntity) throws Exception {

        // 문자열을 데이터타입으로 바꾸고 "yy.MM.dd"형태로 데이터타입을 문자열로 바꾸는 코드
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date datetime = simpleDateFormat.parse(boardEntity.getWriteDatetime());
        simpleDateFormat = new SimpleDateFormat("yy.MM.dd");
        String writeDatetime = simpleDateFormat.format(datetime);

        // 첫글자만 보이고 나머지는 *로 표시하기 위한 코드
        String writerId = boardEntity.getWriterId();
        writerId = writerId.substring(0, 1) + 
        "*".repeat(writerId.length() - 1);

        this.receptionNumber = boardEntity.getReceptionNumber();
        this.status = boardEntity.getStatus();
        this.title = boardEntity.getTitle();
        this.writerId =  writerId;
        this.writeDatetime = writeDatetime;
        this.viewCount = boardEntity.getViewCount();
    }

    public static List<BoardListItem> getList(List<BoardEntity> boardEntities) throws Exception {
        List<BoardListItem> boardList = new ArrayList<>();
        
        // 변경된 것을 반복을 통해서 하나씩 넣음
        for (BoardEntity boardEntity: boardEntities) {
            BoardListItem boardListItem = new BoardListItem(boardEntity);
            boardList.add(boardListItem);
        }

        return boardList;
    }
}
