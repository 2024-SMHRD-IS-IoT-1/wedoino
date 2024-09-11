import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup'
import { Data } from '../AppMain';
import instance from './Axios';


const Parking = () => {
    const [sitList, setSitList] = useState([]);
    const [fireList, setFireList] = useState([]);
    const [inform, setInform] = useState(false);
    const { selected, setSelected } = useContext(Data);
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const arr3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
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
                    console.log("DDDDDDDDDDDDDDDDDDDD");
                    console.log(res.data.fire)
                    if (res.data.fire) {
                        res.data.fire.map((item) => {
                            console.log(item.parking_lot);
                            fList.push(item.parking_lot);
                        })
                        setFireList(fList);
                        console.log("fire",fireList)
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

    return (
        <div style={{ position: 'relative' }}>
            {/* 팝업 띄우기 */}
            <div >
                {inform && <div className='pop_up' style={{ marginLeft: '1200px' }} ref={background}
                    onClick={e => {
                        if (e.target === background.current) {
                            setInform(false);
                        }
                    }}>
                    <Popup value={selected[0]} panel_idx={selected[1]} panel_location={selected[2]}></Popup>
                    <button className="sit_button" onClick={closing}>닫기</button>
                </div>}
            </div>
            <br /><br />
            {/* 주차위치 띄우기 */}
            <div >
                <div style={{ display: 'flex' }}>
                    <div className='normal_blank' >
                        {arr1.map((elem) => {
                            // console.log('elem', elem)
                            {
                                // console.log('자리' + elem)
                                // console.log(sitList.find(item => item == "자리" + elem))
                                return (<button key={elem}
                                    //ref={ref=>(B_ref.current[{elem}] = ref)}
                                    className={(sitList.find(item => item == "자리" + elem)) 
                                        ? (fireList.find(item=>item == "자리" + elem)) ?"fire" : "sit_button_change" 
                                        : (fireList.find(item=>item == "자리" + elem)) ?"fire" : "sit_button"
                                    }
                                        // (fireList.find(item=>item == "자리" + elem)) ?"fire":''
                                    
                                    onClick={() => {
                                        wantZero(elem);
                                    }}>자리{elem}</button>)
                            }
                        })}
                    </div>

                    <div className='blank'>
                        <div></div>
                    </div>

                    <div className='normal_blank'>
                        {arr2.map((elem) => {
                            return (<button key={elem}
                                className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                                onClick={() => {
                                    wantZero(elem);
                                }}>자리{elem}</button>)
                        })}
                    </div>

                    <div className='blank'>
                        <div></div>
                    </div>

                    <div className='normal_blank'>
                        {arr3.map((elem) => {
                            return (<button key={elem} 
                                className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                                onClick={() => {
                                    wantZero(elem);
                                }}>자리{elem}</button>)
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Parking