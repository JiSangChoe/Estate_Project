import axios from 'axios';
import { SignInResponseDto } from './dto/response';
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from 'src/constant';
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from './dto/request';
import ResponseDto from '../response.dto';
import { error } from 'console';
import { requestErrorHandler, requestHandler } from '..';

// function : 로그인 API 함수
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios
        .post(SIGN_IN_REQUEST_URL, requestBody)
        .then(requestHandler<SignInResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 아이디 중복 확인 API 함수
export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios
        .post(ID_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 이메일 인증 API 함수
export const EmailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios
        .post(EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 이메일 인증 확인 API 함수
export const EmailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios
        .post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};

// function : 회원가입 API 함수
export const SignUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios
        .post(SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};
