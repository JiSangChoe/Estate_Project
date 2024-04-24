package com.estate.back.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import com.nimbusds.jose.util.StandardCharset;
import java.security.Key;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

// Jwt 생성 및 검증 기능 제공자
// - jwt 암호화 알고리즘 HS256
// - 비밀키는 환경변수에 있는 jwt.secret-key 를 사용
// - JWT 만료 기간 10시간 
// TODO (이후 1시간)

@Component
public class JwtProvider {
    
    @Value("${jwt.secret-key}")
    private String secretKey;

    private Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharset.UTF_8));

    // JWT 생성 메서드
    public String create(String userId) {

        // 만료일 = 현재시간 + 10시간
        Date expiredDate = Date.from(Instant.now().plus(10, ChronoUnit.HOURS));

        String jwt =Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS256)
            .setSubject(userId)
            .setIssuedAt(new Date())
            .setExpiration(expiredDate)
            .compact();

        return jwt;

    }

    // JWT 검증 메서드
    public String validate (String jwt) {

        String userId = null;

        try {
            userId = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(jwt)
            .getBody()
            .getSubject();
        } catch(Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return userId;
    }
}