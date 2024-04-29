package com.estate.back.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.estate.back.common.object.CustomOAuth2User;
import com.estate.back.provider.JwtProvider;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

    private final JwtProvider jwtProvider;

    @Override
	public void onAuthenticationSuccess(
        HttpServletRequest request, 
        HttpServletResponse response,
		Authentication authentication
        ) 
        throws IOException, ServletException {

            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
            String userId = oAuth2User.getName();

            String token = jwtProvider.create(userId);

            response.sendRedirect("http://localhost:3000/sns/" + token + "/36000");

            }
}
