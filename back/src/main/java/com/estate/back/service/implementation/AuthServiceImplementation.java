package com.estate.back.service.implementation;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.estate.back.common.util.EmailAuthNumberUtil;
import com.estate.back.dto.request.auth.EmailAuthCheckRequestDto;
import com.estate.back.dto.request.auth.EmailAuthRequestDto;
import com.estate.back.dto.request.auth.IdCheckRequestDto;
import com.estate.back.dto.request.auth.SignInRequestDto;
import com.estate.back.dto.request.auth.SignUpRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.auth.SignInResponseDto;
import com.estate.back.entity.EmailAuthNumberEntity;
import com.estate.back.entity.UserEntity;
import com.estate.back.provider.JwtProvider;
import com.estate.back.provider.MailProvider;
import com.estate.back.repository.EmailAuthNumberRepository;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

// Auth 모듈의 비즈니스 로직 구현체
@Service
@RequiredArgsConstructor
public class AuthServiceImplementation implements AuthService{

    private final UserRepository userRepository;
    private final EmailAuthNumberRepository emailAuthNumberRepository;

    private final MailProvider mailProvider;
    private final JwtProvider jwtProvider;

    private PasswordEncoder PasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public ResponseEntity<ResponseDto> idCheck(IdCheckRequestDto dto) {

        try {
            
            String userId = dto.getUserId();
            boolean existedUser = userRepository.existsByUserId(userId);
            if (existedUser) return ResponseDto.duplicatedId();

        } catch (Exception exception) {
            
            exception.printStackTrace();
            return ResponseDto.databaseError();

        }

        return ResponseDto.success();

    }

    @Override
    public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

        String accessToken = null;

        try {
            
            String userId = dto.getUserId();
            String userPassword = dto.getUserPassword();

            UserEntity userEntity = userRepository.findByUserId(userId);
            if (userEntity == null) return ResponseDto.signInFailed();
            
            String encodedPassword = userEntity.getUserPassword();
            boolean isMatched = PasswordEncoder.matches(userPassword, encodedPassword);
            if (!isMatched) ResponseDto.signInFailed();

            accessToken = jwtProvider.create(userId);
            if (accessToken == null) return ResponseDto.tokenCreationFailed();


        } catch (Exception exception) {

            exception.printStackTrace();
            return ResponseDto.databaseError();
        
        }

        return SignInResponseDto.success(accessToken);

    }

    @Override
    public ResponseEntity<ResponseDto> emailAuth(EmailAuthRequestDto dto) {
        
        try {

            String userEmail = dto.getUserEmail();

            boolean existedEmail = userRepository.existsByUserEmail(userEmail);
            if (existedEmail) return ResponseDto.duplicatedEmail();

            String authNumber = EmailAuthNumberUtil.createNumber();

            EmailAuthNumberEntity emailAuthNumberEntity = new EmailAuthNumberEntity(userEmail, authNumber);

            emailAuthNumberRepository.save(emailAuthNumberEntity);

            mailProvider.mailSend(userEmail, authNumber);

        } catch (MessagingException messagingException) {
            messagingException.printStackTrace();
            return ResponseDto.mailSendFailed();


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
        
    }

    @Override
    public ResponseEntity<ResponseDto> emailAuthCheck(EmailAuthCheckRequestDto dto) {

        try {
            
            String userEmail = dto.getUserEmail();
            String authNumber = dto.getAuthNumber();

            boolean isMatch = emailAuthNumberRepository.existsByEmailAndAuthNumber(userEmail, authNumber);
            if (!isMatch) return ResponseDto.authenticationFailed();

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<ResponseDto> signUp(SignUpRequestDto dto) {
        
        try {
            
            String userId = dto.getUserId();
            String userPassword = dto.getUserPassword();
            String userEmail = dto.getUserEmail();
            String authNumber = dto.getAuthNumber();

            boolean existedUser = userRepository.existsById(userId);
            if (existedUser) return ResponseDto.duplicatedId();

            boolean existedEmail = userRepository.existsByUserEmail(userEmail);
            if (existedEmail) return ResponseDto.duplicatedEmail();

            boolean isMatched = emailAuthNumberRepository.existsByEmailAndAuthNumber(userEmail, authNumber);
            if (!isMatched) return ResponseDto.authenticationFailed();

            String encodedPassword = PasswordEncoder.encode(userPassword);
            dto.setUserPassword(encodedPassword);

            UserEntity userEntity = new UserEntity(dto);
            userRepository.save(userEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
        return ResponseDto.success();
    }
    
}
