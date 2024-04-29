package com.estate.back.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.estate.back.entity.UserEntity;
import com.estate.back.provider.JwtProvider;
import com.estate.back.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

// Spring Security Filter Chain에 등록할 JWT 필터
// - Request 객체로부터 Header 정보를 받아와서 Header에 있는 Authorization 필드의 Bearer 토큰 값을 가져와서 JWT 검증
// - 접근주체의 권한을 확인하여 권한 등록
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider; 
    private final UserRepository userRepository;

    // JwtAuthenticationFilter의 실제 동작
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                try {
                    // request 객체에서 Bearer 토큰 값 가져오기
                    String token = parseBearerToken(request);
                    if (token == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    // JWT 검증
                    String userId = jwtProvider.validate(token);
                    if (userId == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    // 접근 주체에 권한을 확인 (권한은 DB에 있음)
                    UserEntity userEntity = userRepository.findByUserId(userId);
                    if (userEntity == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }
                    String role = userEntity.getUserRole();

                    // 권한 테이블(리스트) 생성
                    List<GrantedAuthority> authorities =new ArrayList<>();
                    authorities.add(new SimpleGrantedAuthority(role));

                    // Context에 접근 주체 정보를 추가
                    AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, null, authorities);
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                    securityContext.setAuthentication(authenticationToken);

                    SecurityContextHolder.setContext(securityContext);

                } catch (Exception exception) {
                    exception.printStackTrace();
                }

                filterChain.doFilter(request, response);
    }

    // Request 객체에서 Bearer 토큰 값을 가져오는 메서드
    private String parseBearerToken(HttpServletRequest request) {

        // Request 객체의 Header에서 Authorized 필드 값 추출
        String authorization = request.getHeader("Authorization");
        // Authorization 필드값 존재 여부 확인
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;
        // barer 인증 여부 확인
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer) return null;

        // Authorization 필드값에서 토큰 추출
        String token = authorization.substring(7); //7번째 글자부터 가져와라는 뜻
        return token;
    }
    
}
