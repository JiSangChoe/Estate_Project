package com.estate.back.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

// JWT 생성 및 검증 기능 제공자
// - JWT 암호화 알고리즘 HS256
// - 비밀키는 환경변수에 있는 jwt.secret-key
// - JWT 만료 기간 10시간 
// TODO (이후 1시간)

@Component
public class JwtProvider {
    
    @Value("${jwt.secret-key}")
    private String secretKey;

    // JWT 생성 메서드
    public String create (String userId) {

        // 만료시간 = 현재시간 + 10시간
        Date expiredDate = Date.from(Instant.now().plus(10, ChronoUnit.HOURS));

        String jwt = null;

        try {
            Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

            jwt = Jwts.builder()
                .signWith(key, SignatureAlgorithm.HS256)
                .setSubject(userId)
                .setIssuedAt(new Date())
                .setExpiration(expiredDate)
                .compact();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }
        
        return jwt;

    }

    // JWT 검증 메서드
    public String validate (String jwt) {

        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        String userId = null;

        try {
            userId = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwt)
                .getBody()
                .getSubject();
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return userId;

    }

}