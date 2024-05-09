import React, { useState } from 'react';
import './style.css';
import SelectBox from 'src/components/Selectbox';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Tooltip,
    Legend    
);

//                    component                    //
export default function Ratio() {

    const returnOptions = {
        responsive: false,
        scales: {
            y: {
                min: 150,
                max: 300,
                ticks: {
                    stepSize: 30
                }
            }
        }
    };

    const leaseRatioOptions = {
        responsive: false,
        scales: {
            y: {
                min: 150,
                max: 300,
                ticks: {
                    stepSize: 30
                }
            }
        }
    };

    const monthRentRatioOptions = {
        responsive: false,
        scales: {
            y: {
                min: 150,
                max: 300,
                ticks: {
                    stepSize: 30
                }
            }
        }
    };
    
    //                    state                    //
    const [selectLocal, setSelectLocal] = useState<string>('');

    //                    event handler                    //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const returnData = {
        labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
        datasets: [{
            label: '매매 평균',
            data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
        }]
    };

const leaseRatioData = {
        labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
        datasets: [{
            label: '전세 평균',
            data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
        }]
    };

const monthRentRatioData = {
        labels: ['01', '02', '03','04', '05', '06','07', '08', '09','10', '11', '12'],
        datasets: [{
            label: '월세 평균',
            data: [225, 224, 224, 224, 200, 211, 225, 224, 224, 224, 200, 211],
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
        }]
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
                    <Line width={'1086px'} height={'238px'} options={returnOptions} data={returnData} />
                </div>
            </div>
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>매매가격 대비 전세 비율</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Bar width={'1086px'} height={'238px'} options={leaseRatioOptions} data={leaseRatioData}/>
                </div>
            </div><div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>전세 가격 대비 월세 보증금 비율</div>
                    <div className='local-card-unit'>(단위: 백만원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={monthRentRatioOptions} data={monthRentRatioData}/>
                </div>
            </div>
        </div>
    );
}