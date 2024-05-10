import ResponseDto from "src/apis/response.dto";

export interface GetLocalDataResponseDto extends ResponseDto {
    yearMonth: string[];
    sale: number[];
    lease: number[];
    monthRent: number[];
}