package com.estate.back.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "estate")
@Table(name = "estate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EstateEntity {
    @Id
    private Integer sequence;
    private String local;
    private String yearMonth;
    private Integer sale;               // 매매가
    private Integer lease;              // 전세가
    private Integer monthRent;          // 월세 보증금
    private Integer monthRentFee;       // 월세가
    private Double return40;            // 40m2 이하 수익률
    private Double return4060;          // 40m2 초과 60m2 이하
    private Double return6085;          // 60m2 초과 85m2 이하
    private Double return85;            // 85m2 초과 수익률
    private Double leaseRatio40;        // 40m2 이하 매매가 대비 전세가 비율
    private Double leaseRatio4060;      // 40m2 초과 60m2이하 매매가 대비 전세가 비율
    private Double leaseRatio6085;      // 60m2 초과 85m2이하 매매가 대비 전세가 비율
    private Double leaseRatio85;        // 85m2 초과 매매가 대비 전세가 비율
    private Double monthRentRatio40;    // 40m2 이하 전세가 대비 월세 보증금 비율
    private Double monthRentRatio4060;  // 40m2 초과 60m2이하 전세가 대비 월세 보증금 비율
    private Double monthRentRatio6085;  // 60m2 초과 85m2이하 전세가 대비 월세 보증금 비율
    private Double monthRentRatio85;    // 85m2 초과 전세가 대비 월세 보증금 비율
}
