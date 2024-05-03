package com.estate.back.service.implementation;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import com.estate.back.dto.request.board.PostBoardRequestDto;
import com.estate.back.dto.response.ResponseDto;
import com.estate.back.dto.response.board.GetBoardListResponseDto;
import com.estate.back.dto.response.board.GetSearchBoardListResponseDto;
import com.estate.back.entity.BoardEntity;
import com.estate.back.repository.BoardRepository;
import com.estate.back.repository.UserRepository;
import com.estate.back.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplementation implements BoardService{

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    
    @Override
    public ResponseEntity<ResponseDto> postBoard(PostBoardRequestDto dto, String userId) {
        
        try {

            boolean isExistUser = userRepository.existsById(userId);
            if(!isExistUser) return ResponseDto.authenticationFailed();

            BoardEntity boardEntity = new BoardEntity(dto, userId);
            boardRepository.save(boardEntity);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return ResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetBoardListResponseDto> getBoardList() {
        
        try {

            List<BoardEntity> boardEntities = boardRepository.findByOrderByReceptionNumberDesc();
            return GetBoardListResponseDto.success(boardEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

    
    }

    @Override
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord) {
        
        try {

            List<BoardEntity> boardEntities =boardRepository.findByTitleContainsOrderByReceptionNumberDesc(searchWord);
            return GetSearchBoardListResponseDto.success(boardEntities);

        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }
    }
    
}
