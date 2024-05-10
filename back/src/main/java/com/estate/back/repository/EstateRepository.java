package com.estate.back.repository;

import java.util.List;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.EstateEntity;
import com.estate.back.repository.resultSet.GetLocalDataResultSet;
import com.estate.back.repository.resultSet.GetRatioDataResultSet;

@Repository
public interface EstateRepository extends JpaRepository<EstateEntity, Integer>{
    
    @Query(value=
    "SELECT `year_month` as yearMonth, sale, lease, month_rent as monthRent " +
    "FROM estate " +
    "WHERE `year_month` BETWEEN '2023-01-01' AND '2023-12-01' " +
    "AND `local` = :local ",
    nativeQuery=true
    )
    // 쿼리에 대한 결과를 가지고 오고 싶으면 인터페이스 형식으로 가져올 수 있다.
    // 인터페이스 형식이기 때문에 필드가 없음
    List<GetLocalDataResultSet> getLocalData(@Param("local") String local);

    @Query(value = 
    "SELECT `year_month` as yearMonth, " +
    "return40, return4060, return6085, return85, " +
    "lease_ratio40 as leaseRatio40, " +
    "lease_ratio4060 as leaseRatio4060, " +
    "lease_ratio6085 as leaseRatio6085, " +
    "lease_ratio85 as leaseRatio85, " +
    "month_rent_ratio40 as monthRentRatio40, " +
    "month_rent_ratio4060 as monthRentRatio4060, " +
    "month_rent_ratio6085 as monthRentRatio6085, " +
    "month_rent_ratio85 as monthRentRatio85 " +
    "FROM estate " +
    "WHERE `year_month` BETWEEN '2023-01-01' AND '2023-12-01' " +
    "AND local = :local ",
    nativeQuery = true
    )
    List<GetRatioDataResultSet> getRatioData(@Param("local") String local);
}
