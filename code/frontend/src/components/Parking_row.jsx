import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup';
import { Data } from '../AppMain';
import instance from './Axios';


const Parking_row = () => {
    const [sitList, setSitList] = useState([]);
    const [fireList, setFireList] = useState([]);
    const [inform, setInform] = useState(false);
    const { selected, setSelected } = useContext(Data);
    const arr1 = [31, 32, 33, 34, 35]
    const arr2 = [36, 37, 38, 39, 40]
    const arr3 = [41, 42, 43, 44, 45]
    const arr4 = [46, 47, 48, 49, 50]
    const background = useRef();
    const closing = () => {
        setInform(false)
        setSelected([])
    }
    const wantZero = (elem) => {
        if (inform) {
            alert('열려있는 자리정보를 닫고 시도해주세요')
        } else {
            setInform(true);
            panelInfo("자리" + elem);
        }
    }// 상태 설정


    //onClick Event
    const panelInfo = (sit) => {
        let temp = [];
        console.log(sit);
        instance.post('/', { data: sit })
            .then((res) => {
                console.log(res.data[0])
                temp = [sit, res.data[0].panel_idx, res.data[0].panel_location]
                console.log(temp)
                setSelected(temp)
                console.log(selected)
            }).catch((err) => {
                console.log(err);
                temp = [sit]
                setSelected(temp)
                console.log(selected)
            })
    }

    useEffect(() => {
        // 30초마다 실행
        const intervalId = setInterval(() => {
            // axios를 통한 데이터 전송
            instance.post('/', { data: "1" }) // 여기에 실제 URL을 입력해야 합니다
                .then((res) => {
                    // console.log(typeof (res.data));
                    // 응답 데이터 처리
                    // console.log(res.data);
                    setSitList([])
                    console.log("리스트 초기화 확인", sitList, typeof (sitList))
                    const fList = [];
                    if (res.data.flame) {
                        res.data.fire.map((item) => {
                            fList.push(item.parking_lot);
                        })
                        setFireList(fList);
                    }
                    const list = [];
                    res.data.park.map((item) => {
                        // console.log("map 진입", item)
                        if (item.parking_lot.startsWith("자리")) {
                            if (item.parking_duration > 0) {
                                // console.log(item.parking_lot)
                                // console.log("before", list)
                                list.push(item.parking_lot);
                                // console.log("changed", list)
                            } else {
                                console.log(item.parking_lot, "빔")
                            }
                        }
                    })
                    setSitList(list);
                    console.log(sitList);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 30000); // 30초는 30000 밀리초입니다

        // 클린업 함수: 컴포넌트가 언마운트될 때 interval을 정리합니다
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div style={{ position: 'relative' }}>
            {inform && <div className='pop_up' style={{ marginLeft: '720px', top: '139px' }} ref={background}
                onClick={e => {
                    if (e.target === background.current) {
                        setInform(false);
                    }
                }}>
                {/* style={{ border: "10px solid red"}} */}
                <Popup value={selected[0]} panel_idx={selected[1]} panel_location={selected[2]}></Popup>
                <button className="sit_button" onClick={closing}>닫기</button>
            </div>}
            <br /> <br /> <br />
            <div style={{ position: 'absolute', display: 'contents' }}>
                <div className='row_blank' >
                    {arr1.map((elem) => {
                        return (<button key={elem}
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                                wantZero(elem);
                            }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr2.map((elem) => {
                        return (<button key={elem}
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                                wantZero(elem);
                            }}>자리{elem}
                        </button>)
                    })}
                    <br /><br /><br /><br /><br /><br />
                    {arr3.map((elem) => {
                        return (<button key={elem}
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                                wantZero(elem);
                            }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr4.map((elem) => {
                        return (<button key={elem}
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                                wantZero(elem);
                            }}>자리{elem}
                        </button>)
                    })}
                    {/* <button>자리</button>
        <button>자리</button>
        <button>자리</button>
        <button>자리</button>
        <button>자리</button> */}
                </div>
            </div>
        </div>
    )
}

export default Parking_row