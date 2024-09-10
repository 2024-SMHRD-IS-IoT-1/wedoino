import React from 'react'
import { Link} from 'react-router-dom'
import '../css/panel.css'


const panel = () => {

    // const sendData = () => {
    //     const userdata = {
    //         username: name,
    //         userpw1: pw1,
    //         userbirth: birth,
    //         userphone: phone
    //     }
    //     instance.post('/panel', userdata)
    //         .then((res) => {
    //             console.log(res);
    //         }).catch((err) => {
    //             console.log("[ERREOR] ", err);
    //         })
    // };

    return (
        <body sytle={{ alignItems: 'center' }}>
            <div className="container" >
                <h1>관리자 창</h1><br />
                <div className="side">

                    {/* 1*/}
                    <div className="container"><h2>발전 현황</h2>
                        <div className="side">
                            <div className="card-container">
                                <div className="card">
                                    <div className="card-title">이번 달 누적 생산량</div>
                                    <div className="card-value"> 3000 kW</div>
                                </div><br />
                                <div className="card">
                                    <div className="card-title">누적 축적량</div>
                                    <div className='card-value'>2500kW</div>
                                </div>
                            </div>

                            <div className="card-container">
                                <div calssName="card">
                                    <div className="card-title">
                                        전년 동기간 생산량<br />
                                        <img src="img/chart1.png" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> {/*1*/}

                    {/*2*/}
                    <div className="container_eustate">
                        <h2> 전력사용현황 </h2>
                        <h3>현재 상태</h3>

                        <div className="status-indicator">
                        </div> <span>전력공급: 안정</span>

                        <div className="card-container">
                            <div className="card">
                                <div className="card-title">현재 생산량</div>
                                <div className="card-value">50 kW</div>
                            </div><br />

                            <div className="card">
                                <div className="card-title">배터리 충전상태</div>
                                <div className="card-value">80%</div>
                            </div>

                            <div className="card">
                                <div className="card-title">전압</div>
                                <div className="card-value">230V</div>
                            </div>
                        </div>
                    </div>{/*2*/}
                </div>
                {/*3*/}
                <div className="container_foot"><h2>주차장이용실태</h2>
                    <h4>이용률 높은 주차장 위치</h4>
                    <h4>평균 이용시간</h4>
                    <h4>전년대비 주차 이용률</h4>
                </div>{/*3*/}

                <Link to={'/'}>
                    <button className='button'>
                        주차관리
                    </button>
                </Link>
                <span> </span>
                <Link to={'/regist/permit'}>
                    <button className='button'>
                        등록 승인
                    </button>
                </Link>
            </div>
        </body>
    );
};

export default panel;