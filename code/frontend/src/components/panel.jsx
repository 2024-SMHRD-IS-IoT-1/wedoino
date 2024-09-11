import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/panel.css'
import instance from './Axios';


const Panel = () => {
    // 상태 설정
    const [data, setData] = useState({
        "thisStack": '',
        "thisPure": '',
        "nowEff": '',
        "nowCreate": '',
        "battery": '',
        "V": '',
        "longUse": '',
        "useDuration": '',
        "ultraError": '',
        "panelError": ''
    });

    useEffect(() => {
        // 30초마다 실행
        const intervalId = setInterval(() => {
            // axios를 통한 데이터 전송
            instance.post('/panel', { data: '1' })
                .then((res) => {
                    console.log(res.data);
                    setData(res.data)
                }).catch((err) => {
                    console.log("[ERREOR] ", err);
                })
        }, 10000); // 30초는 30000 밀리초입니다

        // 클린업 함수: 컴포넌트가 언마운트될 때 interval을 정리합니다
        return () => clearInterval(intervalId);
    }, []);


    return (
        <body sytle={{ alignItems: 'center' }}>
            <h1>관리자 창</h1>
            <div className="container" >
                <br />
                <div className="side">
                    {/* 1*/}
                    <div className="container"><h2>발전 현황</h2>
                        <div className="side">
                            <div className="card-container">
                                <div className="card">
                                    <div className="card-title">이번 달 누적 생산량</div>
                                    <div className="card-value"> {data.thisStack} kW</div>
                                </div><br />
                                <div className="card">
                                    <div className="card-title">이번달 순수 생산량</div>
                                    <p style={{ color: "white" }}>(생산량-소비량)</p>
                                    <div className='card-value'>{data.thisPure} kW</div>
                                </div>
                                <div className="card">
                                    <div className="card-title">생산 효율</div>
                                    <div className="card-value">{data.nowEff} %</div>
                                </div>
                            </div>

                            <div className="card-container">
                                <div calssName="card">
                                    <div className="card-title">
                                        전년 동기간 생산량<br />
                                        <img src="img/chart1.png" width='450px' />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> {/*1*/}

                    {/*2*/}
                    <div className="container_eustate">
                        <h2> 전력사용현황 </h2>
                        <h3>현재 상태</h3>

                        {(data.panelError)
                            ? <>
                                <div className="status-indicator_r"></div>
                                <span>전력공급 : 불안정</span>
                            </>
                            : <>
                                <div className="status-indicator_g"></div>
                                <span>전력공급 : 안정</span>
                            </>
                        }
                        <div className="card-container">
                            <div className="card">
                                <div className="card-title">현재 생산량</div>
                                <div className="card-value">{data.nowCreate} kW</div>
                            </div><br />

                            <div className="card">
                                <div className="card-title">배터리 충전상태</div>
                                <div className="card-value">{data.battery}%</div>
                            </div>

                            <div className="card">
                                <div className="card-title">전압</div>
                                <div className="card-value">{data.V}V</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container_foot">
                    <h2 style={{margin: "10px"}}>주차장이용실태</h2>
                    <div className='side'>
                        <div className='card_foot'>
                            <h3>이용률 높은 주차장 위치 </h3>
                            <h1 style={{color:"#00d4ff"}}>{data.longUse}</h1>
                        </div>
                        <div className="card_foot">
                            <h3>평균 이용시간 </h3>
                            <h1 style={{color:"#00d4ff"}}>{data.useDuration}</h1>
                        </div>
                        <div className='card_foot'>
                            <h3>전년대비 주차 이용률</h3>
                            <img width="200px"src="img/chart2.png" />
                        </div>
                    </div>
                </div>

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

export default Panel;