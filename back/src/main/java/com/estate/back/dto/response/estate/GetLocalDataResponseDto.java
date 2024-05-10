package com.estate.back.dto.response.estate;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

import com.estate.back.common.util.ChangeDateFormatUtil;
import com.estate.back.dto.response.ResponseCode;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.ResponseMessage;
import com.estate.back.repository.resultSet.GetLocalDataResultSet;

import lombok.Getter;

@Getter
public class GetLocalDataResponseDto extends ResponseDto {
    private List<String> yearMonth;
    private List<Integer> sale;
    private List<Integer> lease;
    private List<Integer> monthRent;

    private GetLocalDataResponseDto (List<GetLocalDataResultSet> resultSets) throws Exception {
        super(ResponseCode.SUCCESS,ResponseMessage.SUCCESS);

        List<String> yearMonth = new ArrayList<>();
        List<Integer> sale = new ArrayList<>();
        List<Integer> lease = new ArrayList<>();
        List<Integer> monthRent = new ArrayList<>();

        // 레코드가 아닌 하나의 컬럼에서 그 값에 대한 모든 것을 불러오기 위해 forEach로 반복함
        for (GetLocalDataResultSet resultSet: resultSets) {

            String originalDate = resultSet.getYearMonth();
            yearMonth.add(ChangeDateFormatUtil.changeYYMM(originalDate));
            sale.add(resultSet.getSale());
            lease.add(resultSet.getLease());
            monthRent.add(resultSet.getMonthRent());
        }

        this.yearMonth = yearMonth; 
        this.sale = sale; 
        this.lease = lease; 
        this.monthRent = monthRent; 
    }

    public static ResponseEntity<GetLocalDataResponseDto> success(List<GetLocalDataResultSet> resultSets) throws Exception {
        GetLocalDataResponseDto responseBody = new GetLocalDataResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }

}
