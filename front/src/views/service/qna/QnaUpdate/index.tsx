import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css'
import { useUserStore } from 'src/stores';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router';
import { getBoardRequest, putBoardRequest } from 'src/apis/board';
import { GetBoardResponseDto } from 'src/apis/board/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { QNA_DETAIL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH } from 'src/constant';
import { PutBoardRequestDto } from 'src/apis/board/dto/request';

//                    component                    //
export default function QnaUpdate() {

    //                    state                    //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserId, loginUserRole } = useUserStore();
    const { receptionNumber } = useParams();
    const [cookies] = useCookies();
    const [writerId, setWriterId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

    const getBoardResponse = (result: GetBoardResponseDto | ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '올바르지 않은 접수 번호입니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        const { writerId, title, contents, status } = result as GetBoardResponseDto;
        if (writerId !== loginUserId) {
            alert('권한이 없습니다.');
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
        if (status) {
            alert('답변이 완료된 게시물입니다.');
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }

        setTitle(title);
        setContents(contents);
        setWriterId(writerId);

    };

    const putBoardResponse = (result: ResponseDto | null) => {
        const message =
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '권한이 없습니다.' :
            result.code === 'VF' ? '모든 값을 입력해주세요.' :
            result.code === 'NB' ? '존재하지 않는 접수 번호입니다.' :
            result.code === 'WC' ? '이미 답글이 작성되어 있습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        if (!receptionNumber) return;
        navigator(QNA_DETAIL_ABSOLUTE_PATH(receptionNumber))

    };


    //                    event handler                    //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        setTitle(title);
    };

    const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const contents = event.target.value;
        if (contents.length >1000) return;
        setContents(contents);

        if (!contentsRef.current) return;
        contentsRef.current.style.height = 'auto';
        contentsRef.current.style.height = `${contentsRef.current.scrollHeight}px`;
    };

    const onUpdateButtonClickHandler = () => {
        if (!cookies.accessToken || !receptionNumber) return;
        if (!title.trim() || !contents.trim()) return;

        const requestBody: PutBoardRequestDto = { title, contents };
        putBoardRequest(receptionNumber, requestBody, cookies.accessToken).then(putBoardResponse);
    };

    //                    effect                    //
    let effectFlag = false;
    useEffect(() => {
        if (!receptionNumber || !cookies.accessToken) return;
        if (!loginUserRole) return;
        if (effectFlag) return;
        effectFlag = true;
        if (loginUserRole !== 'ROLE_USER' ) {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
        getBoardRequest(receptionNumber, cookies.accessToken).then(getBoardResponse);
    }, [loginUserRole]);    
    
    //                    render                    //
    return( 
        <div id="qna-write-wrapper">
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>
                    <input className='qna-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}/>
                </div>
                <div className='primary-button' onClick={onUpdateButtonClickHandler}>수정</div>
            </div>
            <div className='qna-write-contents-box'>
                <textarea ref={contentsRef} className='qna-write-contents-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} value={contents} onChange={onContentsChangeHandler}/>
            </div>
        </div>
        );
}