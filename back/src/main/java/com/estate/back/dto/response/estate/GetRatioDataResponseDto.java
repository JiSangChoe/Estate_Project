package com.estate.back.dto.response.estate;

import com.estate.back.common.util.ChangeDateFormatUtil;
import com.estate.back.dto.response.ResponseCode;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.ResponseMessage;
import com.estate.back.repository.resultSet.GetRatioDataResultSet;

import lombok.Getter;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;

@Getter
public class GetRatioDataResponseDto extends ResponseDto{
    
    private List<String> yearMonth;

    private List<Double> return40;
    private List<Double> return4060;
    private List<Double> return6085;
    private List<Double> return85;

    private List<Double> leaseRatio40;
    private List<Double> leaseRatio4060;
    private List<Double> leaseRatio6085;
    private List<Double> leaseRatio85;

    private List<Double> monthRentRatio40;
    private List<Double> monthRentRatio4060;
    private List<Double> monthRentRatio6085;
    private List<Double> monthRentRatio85;

    private GetRatioDataResponseDto(List<GetRatioDataResultSet> resultSets) throws Exception {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.yearMonth =new ArrayList<>();

        this.return40 = new ArrayList<>();
        this.return4060 = new ArrayList<>();
        this.return6085 = new ArrayList<>();
        this.return85 = new ArrayList<>();

        this.leaseRatio40 = new ArrayList<>();
        this.leaseRatio4060 = new ArrayList<>();
        this.leaseRatio6085 = new ArrayList<>();
        this.leaseRatio85 = new ArrayList<>();

        this.monthRentRatio40 = new ArrayList<>();
        this.monthRentRatio4060 = new ArrayList<>();
        this.monthRentRatio6085 = new ArrayList<>();
        this.monthRentRatio85 = new ArrayList<>();

        for (GetRatioDataResultSet resultSet: resultSets ) {
            String originalDate = resultSet.getYearMonth();
            this.yearMonth.add(ChangeDateFormatUtil.changeYYMM(originalDate));

            this.return40.add(resultSet.getReturn40());
            this.return4060.add(resultSet.getReturn4060());
            this.return6085.add(resultSet.getReturn6085());
            this.return85.add(resultSet.getReturn85());

            this.leaseRatio40.add(resultSet.getLeaseRatio40());
            this.leaseRatio4060.add(resultSet.getLeaseRatio4060());
            this.leaseRatio6085.add(resultSet.getLeaseRatio6085());
            this.leaseRatio85.add(resultSet.getLeaseRatio85());

            this.monthRentRatio40.add(resultSet.getMonthRentRatio40());
            this.monthRentRatio4060.add(resultSet.getMonthRentRatio4060());
            this.monthRentRatio6085.add(resultSet.getMonthRentRatio6085());
            this.monthRentRatio85.add(resultSet.getMonthRentRatio85());
        }
    }

    public static ResponseEntity<GetRatioDataResponseDto> success (List<GetRatioDataResultSet> resultSets) throws Exception {
        GetRatioDataResponseDto responseBody = new GetRatioDataResponseDto(resultSets);
        return ResponseEntity.status(HttpStatus.OK).body(responseBody);
    }
}
