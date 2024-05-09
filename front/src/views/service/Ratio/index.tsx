import React, { useState } from 'react';
import './style.css';
import SelectBox from 'src/components/Selectbox';

//                    component                    //
export default function Ratio() {
    
    //                    state                    //
    const [selectLocal, setSelectLocal] = useState<string>('');

    //                    event handler                    //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    //                    render                    //
    return (
        <div id='local-wrapper'>
            <div className='local-top'>
                <div className='local-search-box'>
                    <SelectBox value={selectLocal} onChangeValue={onLocalChangeHandler}/>
                    <div className='primary-button'>검색</div>
                </div>
                <div className='local-origin-text'>데이터 출처: KOSIS</div>
            </div>
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>수익률 평균</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    
                </div>
            </div>
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>매매가격 대비 전세 비율</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    
                </div>
            </div><div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>전세 가격 대비 월세 보증금 비율</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    
                </div>
            </div>
        </div>
    );
}