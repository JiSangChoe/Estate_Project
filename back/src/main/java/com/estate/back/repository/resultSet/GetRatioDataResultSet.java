package com.estate.back.repository.resultSet;

import java.util.List;

public interface GetRatioDataResultSet {
    
    String getYearMonth();

    Double getReturn40();
    Double getReturn4060();
    Double getReturn6085();
    Double getReturn85();

    Double getLeaseRatio40();
    Double getLeaseRatio4060();
    Double getLeaseRatio6085();
    Double getLeaseRatio85();

    Double getMonthRentRatio40();
    Double getMonthRentRatio4060();
    Double getMonthRentRatio6085();
    Double getMonthRentRatio85();
}
