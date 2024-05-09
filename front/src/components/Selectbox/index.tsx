import React, { useState } from 'react'
import './style.css';

//                    component                    //
export default function SelectBox() {

    const listItem = [
        { name: '전국', value: '' },
        { name: '수도권', value: '' },
        { name: '지방', value: '' },
        { name: '서울', value: '' },
        { name: '부산', value: '' },
        { name: '대구', value: '' },
        { name: '인천', value: '' },
        { name: '광주', value: '' },
        { name: '대전', value: '' },
        { name: '울산', value: '' },
        { name: '세종', value: '' },
        { name: '경기', value: '' },
    ]

    //                    state                    //
    const [show, setShow] = useState<boolean>(false);

    //                    event handler                    //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    const onItemClickHandler = () => {

        setShow(false);
    };

    //                    render                    //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
    <div>
        <div className='select-box'>
            <div className='select-none'>지역</div>
            {/* <div className='select-item'>서울</div> */}
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && 
            <div className='select-list'>
                {listItem.map((item) => 
                <div className='select-list-item-box' onClick={onItemClickHandler}>
                    <div className='select-item'>{item.name}</div>
                </div>)}
                
            </div>
            }
        </div>
    </div>
)
}
