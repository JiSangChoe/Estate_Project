import React from 'react';
import './style.css'
import { Outlet } from 'react-router';


//              component                   //
export default function ServiceContainer() {

    //                    render                    //
    return (
    <div id="wrapper">
        <div className="logo-container">임대주택 가격 서비스</div>
        <div className="top-bar-container">
            <div className="top-bar-title">지역 평균</div>
            <div className="second-button">로그아웃</div>
        </div>
        <div className="side-navigation-container">
            <div className="side-navigation-item active">
                <div className="side-navigation-icon chart"></div>
                <div className="side-navigation-title">지역 평균</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon pie"></div>
                <div className="side-navigation-title">비율 계산</div>
            </div>
            <div className="side-navigation-item">
                <div className="side-navigation-icon edit"></div>
                <div className="side-navigation-title">Q&A 게시판</div>
            </div>
        </div>
        <div className="main-container">
            <Outlet />            
        </div>
    </div>
    );

}
