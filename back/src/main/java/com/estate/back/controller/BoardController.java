package com.estate.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.board.GetBoardListResponseDto;
import com.estate.back.dto.response.board.GetSearchBoardListResponseDto;
import com.estate.back.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {
    
    private final BoardService boardService;

    @PostMapping("/")
    ResponseEntity<ResponseDto> postBoard (
        @RequestBody @Valid  PostBoardRequestDto requestBody,
        @AuthenticationPrincipal String userId
    ) {
        ResponseEntity<ResponseDto> response = boardService.postBoard(requestBody, userId);
        return response;
    }

    @GetMapping("/list")
    public ResponseEntity<? super GetBoardListResponseDto> getBoardList () {
        ResponseEntity<? super GetBoardListResponseDto> response = boardService.getBoardList();
        return response;
    }

    @GetMapping("/list/{searchWord}")
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList (
        @PathVariable("searchWord") String searchWord 
    ) {
        ResponseEntity<? super GetSearchBoardListResponseDto> response = boardService.getSearchBoardList(searchWord);
        return response;
    }
}
