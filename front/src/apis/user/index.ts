import axios from "axios";
import { GET_SIGN_IN_USER_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import { GetSignInUserResponseDto } from "./dto/response";

// function: 로그인 유저 정보 불러오기 API 함수
export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_REQUEST_URL, bearerAuthorization(accessToken))
        .then(requestHandler<GetSignInUserResponseDto>)
        .catch(requestErrorHandler);
    return result;
};