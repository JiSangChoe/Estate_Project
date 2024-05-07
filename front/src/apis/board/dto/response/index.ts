import ResponseDto from "src/apis/response.dto";
import { BoardListItem } from "src/types";

export interface GetBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetSearchBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetBoardResponseDto extends ResponseDto {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null;
}