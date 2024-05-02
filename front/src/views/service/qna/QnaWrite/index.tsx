import React from 'react';
import './style.css'

//                    component                    //
export default function QnaWrite() {
    
    //                    render                    //
    return( 
        <div id="qna-write-wrapper">
            <div className='qna-write-top'>
                <div className='qna-write-title-box'>
                    <input />
                </div>
                <div>올리기</div>
            </div>
            <div>
                <textarea />
            </div>
        </div>
        );
}