
package com.estate.back.provider;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import jakarta.mail.MessagingException;
import jakarta.mail.Message.RecipientType;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

// email 전송을 위한 제공자
// - gmail smtp 서버를 사용

// SMTP (Simple Mail Transfer Protocol) : 
// - 인터넷을 통해서 이메일 메세지를 보내고 받는 데 사용되는 통신 프로토콜
// - 메일 서버 및 기타 메시지 전송 에이전트(MTA)에서 메일 전송, 수신, 중계를 할 때 사용됨
// - 기본 포트 : TCP 25

// TLS (Transport Layer Security) :
// - 전송 계층 보안
// - 인터넷에서 의사소통을 위한 개인 정보와 데이터 보안을 위해 사용되는 보안 프로토콜
// - 서버 간 통신에서 데이터를 암호화하여 전송 및 수신
// - 이메일, 메시지 전송 암호화에 주로 사용됨
@Component
@RequiredArgsConstructor
public class MailProvider {

    @Value("${spring.mail.username}")
    private String from;
    private final JavaMailSender javaMailSender;

    // 이메일 인증 메일 전송 메서드
    public void mailAuthSend (String to, String authNumber) throws MessagingException {

        // 전송할 메시지 객체 생성
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        // 메시지 전송자 메일 지정
        mimeMessage.setFrom(from);
        // 메시지 수신자 메일 지정
        mimeMessage.setRecipient(RecipientType.TO, new InternetAddress(to));
        // 메시지 제목 지정
        mimeMessage.setSubject("estate 인증 번호");
        // 메시지 내용 지정
        mimeMessage.setText(getText(authNumber), "utf-8", "html");
        // 메시지 전송
        javaMailSender.send(mimeMessage);

    }

    private String getText (String authNumber) {
        String text = 
            "<h2 style='text-align: center;'>estate 인증 번호</h2>" +
            "<p>요청하신 email 인증 번호는 <strong style='color: red;'>" + 
            authNumber +
            "</strong>입니다.</p>";
        return text;
    }

    
}
