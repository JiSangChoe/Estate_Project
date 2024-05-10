package com.estate.back.repository.resultSet;

public interface GetLocalDataResultSet {
    // JPA가 스스로 만들어버림 (get을 이용해)
    String getYearMonth();
    Integer getSale();
    Integer getLease();
    Integer getMonthRent();
}
