package com.estate.back.dto.response.estate;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import com.estate.back.dto.response.ResponseCode;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.ResponseMessage;
import com.estate.back.entity.EstateEntity;

import lombok.Getter;

@Getter
public class GetLocalDataResponseDto extends ResponseDto {
    private List<String> yearMonth;
    private List<Integer> sale;
    private List<Integer> lease;
    private List<Integer> monthRent;

    private GetLocalDataResponseDto () {
        super(ResponseCode.SUCCESS,ResponseMessage.SUCCESS);
        this.yearMonth = null; 
        this.sale = null; 
        this.lease = null; 
        this.monthRent = null; 
    }

    public static ResponseEntity<GetLocalDataResponseDto> success(String data) {
        GetLocalDataResponseDto responseBody = new GetLocalDataResponseDto();
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
