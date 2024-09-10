import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup'
import { Data } from '../AppMain';
import instance from './Axios';


const Parking = () => {
    const [sitList, setSitList] = useState([])
    const [inform, setInform] = useState(false);
    const { selected, setSelected } = useContext(Data);
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const arr2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const arr3 = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
    const background = useRef();

    const closing = () => {
        return (
            setInform(false),
            setSelected(0)
        )
    }
    const wantZero = () => {
        if (selected != 0) {
            alert('다음엔 해당 좌석을 닫고 열어주세요')
        }
    }
    // 상태 설정

    useEffect(() => {
        // 30초마다 실행
        const intervalId = setInterval(() => {
            // axios를 통한 데이터 전송
            instance.post('/', { data: "1" }) // 여기에 실제 URL을 입력해야 합니다
                .then((res) => {
                    // console.log(typeof (res.data));
                    // 응답 데이터 처리
                    console.log(res.data);
                    setSitList([])
                    console.log("리스트 초기화 확인",sitList,typeof(sitList))
                    const list = [];
                    res.data.map((item)=> {
                        console.log("map 진입",item)
                        if (item.parking_lot.startsWith("자리")) {
                            if (item.parking_duration > 0) {
                                console.log(item.parking_lot)
                                console.log("before",list)
                                list.push(item.parking_lot);
                                console.log("changed",list)
                            } else {
                                console.log(item.parking_lot,"빔")
                            }
                        }
                    })
                    setSitList(list)
                })
                .catch((error) => {
                    console.error(error);
                });
        }, 10000); // 30초는 30000 밀리초입니다

        // 클린업 함수: 컴포넌트가 언마운트될 때 interval을 정리합니다
        return () => clearInterval(intervalId);
    }, []);

    //onClick Event

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
                    <Popup value={selected}></Popup>
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
                                    className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                                    onClick={() => {
                                        console.log('1');
                                        wantZero();
                                        setInform(true);
                                        setSelected(elem);
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
                                    console.log('2');
                                    wantZero();
                                    setInform(true);
                                    setSelected(elem);
                                }}>자리{elem}</button>)
                        })}
                    </div>

                    <div className='blank'>
                        <div></div>
                    </div>

                    <div className='normal_blank'>
                        {arr3.map((elem) => {
                            return (<button key={elem} className="sit_button"

                                onClick={() => {
                                    console.log('3');
                                    wantZero();
                                    setInform(true);
                                    setSelected(elem);
                                }}>자리{elem}</button>)
                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Parking