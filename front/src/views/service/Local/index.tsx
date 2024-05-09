import React, { useState } from 'react';
import './style.css'
import SelectBox from 'src/components/Selectbox';
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip    
    );

//                    component                    //
export default function Local() {

    const options = {
        responsive: true,
    };

    //                    state                    //
    const [selectLocal, setSelectLocal] = useState<string>('');

    //                    event handler                    //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const saleData = {
            labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
            datasets: [{
                label: '매매 평균',
                data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        }

    const leaseData = {
            labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
            datasets: [{
                label: '전세 평균',
                data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        }

    const monthRentData = {
            labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
            datasets: [{
                label: '월세 평균',
                data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        }

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
                    <div className='local-card-title'>매매 평균</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line options={options} data={saleData}/>
                </div>
            </div>
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>전세 평균</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line options={options} data={leaseData}/>
                </div>
            </div><div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>월세 평균</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line options={options} data={monthRentData}/>
                </div>
            </div>
        </div>
    );
}