import React, { useState } from 'react'
import './style.css';

interface Prop {
    value: string;
    onChange: (value: string) => void;
}

//                    component                    //
export default function SelectBox({ value, onChange }: Prop) {

    const listItem = [
        { name: '전국', value: 'NATIONWIDE' },
        { name: '수도권', value: 'CAPITAL_AREA' },
        { name: '지방', value: 'LOCAL_AREA' },
        { name: '서울', value: 'SEOUL' },
        { name: '부산', value: 'BUSAN' },
        { name: '대구', value: 'DAEGU' },
        { name: '인천', value: 'INCHEON' },
        { name: '광주', value: 'GWANGJU' },
        { name: '대전', value: 'DAEJEON' },
        { name: '울산', value: 'ULSAN' },
        { name: '세종', value: 'SAEJONG' },
        { name: '경기', value: 'GYEONGGI' },
    ];

    //                    state                    //
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    //                    event handler                    //
    const onButtonClickHandler = () => {
        setShow(!show);
    };
    const onItemClickHandler = (value: string) => {
        listItem.forEach(item => {
            if (item.value === value) setName(item.name);
        })
        onChange(value);
        setShow(false);
    };

    //                    render                    //
    const buttonClass = show ? 'select-close-button' : 'select-open-button';
    return (
        <div className='select-box'>
            { value === '' ? 
            <div className='select-none'>지역</div> :
            <div className='select-item'>{name}</div>
            }  
            <div className={buttonClass} onClick={onButtonClickHandler}></div>
            {show && 
            <div className='select-list'>
                {listItem.map((item) => 
                <div className='select-list-item-box' onClick={() => onItemClickHandler(item.value)}>
                    <div className='select-item'>{item.name}</div>
                </div>
                )}
            </div>
            }
        </div>
    );
}
