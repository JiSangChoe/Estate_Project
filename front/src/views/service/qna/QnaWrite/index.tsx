import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css'
import { useUserStore } from 'src/stores';
import { useNavigate } from 'react-router';
import { QNA_LIST_ABSOLUTE_PATH } from 'src/constant';

//                    component                    //
export default function QnaWrite() {
    //                    state                    //
    const contentsRef = useRef<HTMLTextAreaElement | null>(null);
    const { loginUserRole } = useUserStore();
    const [title, setTitle] = useState<string>('');
    const [contents, setContents] = useState<string>('');

    //                    function                    //
    const navigator = useNavigate();

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

    const onPostButtonClickHandler = () => {
        if (!title || !contents) return;
        alert('작성!');
    };

    //                    effect                    //
    useEffect(() => {
        if (loginUserRole === 'ROLE_ADMIN') {
            navigator(QNA_LIST_ABSOLUTE_PATH);
            return;
        }
    },[]);
    
    //                    render                    //
    return( 
        <div id="qna-write-wrapper">
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>
                    <input className='qna-write-title-input' placeholder='제목을 입력해주세요.' value={title} onChange={onTitleChangeHandler}/>
                </div>
                <div className='primary-button' onClick={onPostButtonClickHandler}>올리기</div>
            </div>
            <div className='qna-write-contents-box'>
                <textarea ref={contentsRef} className='qna-write-contents-textarea' placeholder='내용을 입력해주세요. / 1000자' maxLength={1000} value={contents} onChange={onContentsChangeHandler}/>
            </div>
        </div>
        );
}