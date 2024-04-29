import { AxiosResponse } from "axios";
import ResponseDto from "./response.dto";

// function : Request 처리 함수
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
    const responseBody = response.data as T;
    return responseBody;
};

// function : Request Error 처리 함수
export const requestErrorHandler = (error: any) => {
    const responseBody = error.response?.data;
    if (!responseBody) return null; // undefined로 확인되지만 null로 바꾼것
    return responseBody as ResponseDto;
};