import React, { useState } from 'react';
import './style.css'
import SelectBox from 'src/components/Selectbox';
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { useCookies } from 'react-cookie';
import { getLocalDataRequest } from 'src/apis/estate';
import { GetLocalDataResponseDto } from 'src/apis/estate/dto/response';
import ResponseDto from 'src/apis/response.dto';
import { useNavigate } from 'react-router';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip    
);

//                    component                    //
export default function Local() {

    const saleOptions = {
        responsive: false,
    };

    const leaseOptions = {
        responsive: false,
    };

    const monthRentOptions = {
        responsive: false,
    };

    //                    state                    //
    const [cookies] = useCookies();
    const [selectLocal, setSelectLocal] = useState<string>('');
    const [yearMonth, setYearMonth] = useState<string[]>([]);
    const [sale, setSale] = useState<number[]>([]);
    const [lease, setLease] = useState<number[]>([]);
    const [monthRent, setMonthRent] = useState<number[]>([]);

    //                    function                    //
    const getLocalDataResponse = (result: GetLocalDataResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'VF' ? '잘못된 지역입니다.' : 
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            return;
        }

        const { yearMonth, sale, lease, monthRent } = result as GetLocalDataResponseDto;
        setYearMonth(yearMonth);
        setSale(sale);
        setLease(lease);
        setMonthRent(monthRent);
    };


    //                    event handler                    //
    const onLocalChangeHandler = (selectLocal: string) => {
        setSelectLocal(selectLocal);
    };
    const onSearchClickHandler = () => {
        if (!selectLocal || !cookies.accessToken) return;
        getLocalDataRequest(selectLocal, cookies.accessToken).then(getLocalDataResponse);
    };

    const saleData = {
            labels: yearMonth,
            datasets: [{
                label: '매매 평균',
                data: sale,
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        };

    const leaseData = {
            labels: yearMonth,
            datasets: [{
                label: '전세 평균',
                data: lease,
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        };

    const monthRentData = {
            labels: yearMonth,
            datasets: [{
                label: '월세 보증금 평균',
                data: monthRent,
                borderColor: 'rgba(58,87,232,1)',
                backgroundColor: 'rgba(58,87,232,1)'
            }]
        };

    //                    render                    //
    const buttonClass = selectLocal ? 'primary-button' : 'disable-button';
    return (
        <div id='local-wrapper'>
            <div className='local-top'>
                <div className='local-search-box'>
                    <SelectBox value={selectLocal} onChange={onLocalChangeHandler} />
                    <div className={buttonClass} onClick={onSearchClickHandler}>검색</div>
                </div>
                <div className='local-origin-text'>데이터 출처: KOSIS</div>
            </div>
            { !sale.length && !lease.length && !monthRent.length &&
            <div className='local-no-data-text'>검색 결과가 없습니다.</div>
            }
            { sale.length !== 0 &&
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>매매 평균</div>
                    <div className='local-card-unit'>(단위: 천원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={saleOptions} data={saleData} />
                </div>
            </div>
            }
            { lease.length !== 0 && 
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>전세 평균</div>
                    <div className='local-card-unit'>(단위: 천원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={leaseOptions} data={leaseData} />
                </div>
            </div>
            }
            { monthRent.length !== 0 &&
            <div className='local-card'>
                <div className='local-card-title-box'>
                    <div className='local-card-title'>월세 평균</div>
                    <div className='local-card-unit'>(단위: 천원)</div>
                </div>
                <div className='local-card-chart-box'>
                    <Line width={'1086px'} height={'238px'} options={monthRentOptions} data={monthRentData} />
                </div>
            </div>
            }
        </div>
    );
}