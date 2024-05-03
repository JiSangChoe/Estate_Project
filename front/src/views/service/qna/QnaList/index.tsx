import React, { useState } from 'react';
import './style.css'
import { useUserStore } from 'src/stores';
import { useNavigate } from 'react-router';
import { QNA_WRITE_ABSOLUTE_PATH } from 'src/constant';

//                    component                    //
export default function QnaList() {
    //                    state                    //
    const {loginUserRole} = useUserStore();

    const [totalLength, setTotalLength] = useState<number>(0);
    const [totalPage, setTotalPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isToggleOn, setToggleOn] = useState<boolean>(false);

    //                    function                    //
    const navigator = useNavigate();
    
    //                    event handler                    //
    const onWriteButtonClickHandler = () => {
        if (loginUserRole !== 'ROLE_USER') return;
        navigator(QNA_WRITE_ABSOLUTE_PATH);
    };

    const onToggleClickHandler = () => {
        if (loginUserRole !== 'ROLE_ADMIN') return;
        setToggleOn(!isToggleOn);
    };

    //                    render                    //

    const toggleClass = isToggleOn ? 'toggle-active' : 'toggle';

    return (
        <div id='qna-list-wrapper'>
            <div className='qna-lis-top'>
                <div className='qna-list-size-text'>전체 <span className='emphasis'>{totalLength}건</span> | 페이지 <span className='emphasis'>{currentPage}/{totalPage}</span></div>
                <div className='qna-list-top-right'>
                    {loginUserRole === 'ROLE_USER' ? <div className='primary-button' onClick={onWriteButtonClickHandler}>글쓰기</div> : 
                    <>
                        <div className={toggleClass} onClick={onToggleClickHandler}></div>
                        <div className='qna-list-top-admin-text'>미완료 보기</div>
                    </>}
                </div>
            </div>
            <div className='qna-list-table'>
                <div className='qna-list-table-th'>
                    <div>접수번호</div>
                    <div>상태</div>
                    <div>제목</div>
                    <div>작성자</div>
                    <div>작성일</div>
                    <div>조회수</div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div>
                <div>
                    <div></div>
                    <div>1</div>
                    <div></div>
                </div>
                <div>
                    <div>
                        <input />
                    </div>
                    <div>검색</div>
                </div>
            </div>
        </div>
    );
}