import React, { useState } from 'react';
import './style.css';
import SelectBox from 'src/components/Selectbox';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';
import { GetRatioDataResponseDto } from 'src/apis/estate/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { getRatioDataRequest } from 'src/apis/estate';

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
    };

    const leaseRatioOptions = {
        responsive: false,
    };

    const monthRentRatioOptions = {
        responsive: false,
    };
    
    //                    state                    //
    const [cookies] = useCookies();
    const [selectLocal, setSelectLocal] = useState<string>('');
    const [yearMonth, setYearMonth] = useState<string[]>([]);

    const [return40, setReturn40] = useState<number[]>([]);
    const [return4060, setReturn4060] = useState<number[]>([]);
    const [return6085, setReturn6085] = useState<number[]>([]);
    const [return85, setReturn85] = useState<number[]>([]);

    const [leaseRatio40, getLeaseRatio40] = useState<number[]>([]);
    const [leaseRatio4060, getLeaseRatio4060] = useState<number[]>([]);
    const [leaseRatio6085, getLeaseRatio6085] = useState<number[]>([]);
    const [leaseRatio85, getLeaseRatio85] = useState<number[]>([]);

    const [monthRentRatio40, getMonthRentRatio40] = useState<number[]>([]);
    const [monthRentRatio4060, getMonthRentRatio4060] = useState<number[]>([]);
    const [monthRentRatio6085, getMonthRentRatio6085] = useState<number[]>([]);
    const [monthRentRatio85, getMonthRentRatio85] = useState<number[]>([]);

    //                    function                    //
    const getRatioDataResponse = (result: GetRatioDataResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 지역입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { yearMonth, return40, return4060, return6085, return85, leaseRatio40, leaseRatio4060, leaseRatio6085, leaseRatio85, monthRentRatio40, monthRentRatio4060, monthRentRatio6085, monthRentRatio85 } = result as GetRatioDataResponseDto;
        setYearMonth(yearMonth);

        setReturn40(return40);
        setReturn4060(return4060);
        setReturn6085(return6085);
        setReturn85(return85);

        getLeaseRatio40(leaseRatio40);
        getLeaseRatio4060(leaseRatio4060);
        getLeaseRatio6085(leaseRatio6085);
        getLeaseRatio85(leaseRatio85);

        getMonthRentRatio40(monthRentRatio40);
        getMonthRentRatio4060(monthRentRatio4060);
        getMonthRentRatio6085(monthRentRatio6085);
        getMonthRentRatio85(monthRentRatio85);
    };


    //                    event handler                    //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };

    const onSearchClickHandler = () => {
        if (!selectLocal || !cookies.accessToken) return;
        getRatioDataRequest(selectLocal, cookies.accessToken).then(getRatioDataResponse);
    };

    const returnData = {
        labels: yearMonth,
        datasets: [
            {
            label: '40 이하',
            data: return40,
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
            },
            {
            label: '40 초과 60 이하',
            data: return4060,
            borderColor: 'rgba(0,203,93,1)',
            backgroundColor: 'rgba(0,203,93,1)'
            },
            {
                label: '60 초과 85 이하',
            data: return6085,
            borderColor: 'rgba(255,168,0,1)',
            backgroundColor: 'rgba(255,168,0,1)'
            },
            {
                label: '85 초과',
            data: return85,
            borderColor: 'rgba(255,84,64,1)',
            backgroundColor: 'rgba(255,84,64,1)'
            }
    ]
    };

const leaseRatioData = {
        labels: yearMonth,
        datasets: [
            {
            label: '40 이하',
            data: leaseRatio40,
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
            },
            {
            label: '40 초과 60 이하',
            data: leaseRatio4060,
            borderColor: 'rgba(0,203,93,1)',
            backgroundColor: 'rgba(0,203,93,1)'
            },
            {
                label: '60 초과 85 이하',
            data: leaseRatio6085,
            borderColor: 'rgba(255,168,0,1)',
            backgroundColor: 'rgba(255,168,0,1)'
            },
            {
                label: '85 초과',
            data: leaseRatio85,
            borderColor: 'rgba(255,84,64,1)',
            backgroundColor: 'rgba(255,84,64,1)'
            }
    ]
    };

const monthRentRatioData = {
        labels: yearMonth,
        datasets: [
            {
            label: '40 이하',
            data: monthRentRatio40,
            borderColor: 'rgba(58,87,232,1)',
            backgroundColor: 'rgba(58,87,232,1)'
            },
            {
            label: '40 초과 60 이하',
            data: monthRentRatio4060,
            borderColor: 'rgba(0,203,93,1)',
            backgroundColor: 'rgba(0,203,93,1)'
            },
            {
                label: '60 초과 85 이하',
            data: monthRentRatio6085,
            borderColor: 'rgba(255,168,0,1)',
            backgroundColor: 'rgba(255,168,0,1)'
            },
            {
                label: '85 초과',
            data: monthRentRatio85,
            borderColor: 'rgba(255,84,64,1)',
            backgroundColor: 'rgba(255,84,64,1)'
            }
    ]
    };

    //                    render                    //
    const returnFlag = 
        !!return40.length && !!return4060.length && !!return6085.length && !!return85.length;
    const leaseFlag 
        = !!leaseRatio40.length && !!leaseRatio4060.length && !!leaseRatio6085.length && !!leaseRatio85.length;
    const monthRentFlag 
        = !!monthRentRatio40.length && !!monthRentRatio4060.length && !!monthRentRatio6085.length && !!monthRentRatio85.length;

    const buttonClass = selectLocal ? 'primary-button' : 'disable-button';

    return (
        <div id='local-wrapper'>
            <div className='local-top'>
                <div className='local-search-box'>
                    <SelectBox value={selectLocal} onChange={onLocalChangeHandler}/>
                    <div className={buttonClass} onClick={onSearchClickHandler} >검색</div>
                </div>
                <div className='local-origin-text'>데이터 출처: KOSIS</div>
            </div>
            { !returnFlag && !leaseFlag && !monthRentFlag &&
            <div className='local-no-data-text'>검색 결과가 없습니다.</div>
            }
            { returnFlag &&
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>수익률 평균</div>
                    <div className='local-card-unit'>(단위: %)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={returnOptions} data={returnData} />
                </div>
            </div>
            }
            { leaseFlag &&
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>매매가격 대비 전세 비율</div>
                    <div className='local-card-unit'>(단위: %)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Bar width={'1086px'} height={'238px'} options={leaseRatioOptions} data={leaseRatioData}/>
                </div>
            </div>
            }
            {monthRentFlag &&
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>전세 가격 대비 월세 보증금 비율</div>
                    <div className='local-card-unit'>(단위: %)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={monthRentRatioOptions} data={monthRentRatioData}/>
                </div>
            </div>
            }
        </div>
    );
}