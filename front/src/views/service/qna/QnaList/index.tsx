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
                    <div className='qna-list-table-reception-number'>접수번호</div>
                    <div className='qna-list-table-status'>상태</div>
                    <div className='qna-list-table-title'>제목</div>
                    <div className='qna-list-table-writer-id'>작성자</div>
                    <div className='qna-list-table-write-date'>작성일</div>
                    <div className='qna-list-table-viewcount'>조회수</div>
                </div>
                <div className='qna-list-table-tr'>
                <div className='qna-list-table-reception-number'>접수번호</div>
                    <div className='qna-list-table-status'>
                        <div className='primary-badge'>접수</div>
                    </div>
                    <div className='qna-list-table-title' style={{ textAlign: 'left' }}>제목</div>
                    <div className='qna-list-table-writer-id'>작성자</div>
                    <div className='qna-list-table-write-date'>작성일</div>
                    <div className='qna-list-table-viewcount'>조회수</div>
                </div>
            </div>
            <div className='qna-list-bottom'>
                <div style={{width:'299px'}}></div>
                <div className='qna-list-pagination'>
                    <div className='qna-list-page-left' ></div>
                    <div className='qna-list-page-box'>
                        <div className='qna-list-page-active'>1</div>
                        <div className='qna-list-page'>1</div>
                    </div>
                    <div className='qna-list-page-right' ></div>
                </div>
                <div className='qna-list-search-box'>
                    <div className='qna-list-search-input-box'>
                        <input className='qna-list-search-input'/>
                    </div>
                    <div className='disable-button'>검색</div>
                </div>
            </div>
        </div>
    );
}