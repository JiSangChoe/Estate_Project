package com.estate.back.repository;

import java.util.List;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.estate.back.entity.EstateEntity;
import com.estate.back.repository.resultSet.GetLocalDataResultSet;

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
}
