package com.estate.back.dto.response.board;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.estate.back.common.util.ChangeDateFormatUtil;
import com.estate.back.dto.response.ResponseCode;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.ResponseMessage;
import com.estate.back.entity.BoardEntity;

import lombok.Getter;

@Getter
public class GetBoardResponseDto extends ResponseDto {
    
    private int receptionNumber;
    private boolean status;
    private String title;
    private String writerId;
    private String writeDatetime;
    private Integer viewCount;
    private String contents;
    private String comment;

    private GetBoardResponseDto (BoardEntity boardEntity) throws Exception{
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        String writeDatetime = ChangeDateFormatUtil.changeYYYYMMDD(boardEntity.getWriteDatetime());

        this.receptionNumber = boardEntity.getReceptionNumber();
        this.status = boardEntity.getStatus();
        this.title = boardEntity.getTitle();
        this.writerId = boardEntity.getWriterId();
        this.writeDatetime = writeDatetime;
        this.viewCount = boardEntity.getViewCount();
        this.contents = boardEntity.getContents();
        this.comment = boardEntity.getComment();
    }

    public static ResponseEntity<GetBoardResponseDto> success(BoardEntity boardEntity) throws Exception {
        GetBoardResponseDto responseBody = new GetBoardResponseDto(boardEntity);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
