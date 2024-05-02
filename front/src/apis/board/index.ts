import axios from "axios";
import { PostBoardRequestDto } from "./dto/request";
import { POST_BOARD_REQUEST_URL } from "src/constant";
import { bearerAuthorization, requestErrorHandler, requestHandler } from "..";
import ResponseDto from "../response.dto";

// function: Q&A 작성 API 함수
export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_REQUEST_URL, requestBody, bearerAuthorization(accessToken))
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler);
    return result;
};