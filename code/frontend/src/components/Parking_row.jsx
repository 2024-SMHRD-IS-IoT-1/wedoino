import React, { useContext, useEffect, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup';
import { Data } from '../AppMain';
import instance from './Axios';


const Parking_row = () => {
    const [sitList, setSitList] = useState([])
    const [inform, setInform] = useState(false);
    const {selected, setSelected} = useContext(Data);
    const arr1 = [31, 32, 33, 34, 35]
    const arr2 = [36, 37, 38, 39, 40]
    const arr3 = [41, 42, 43, 44, 45]
    const arr4 = [46, 47, 48, 49, 50]
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

    useEffect(() => {
        // 10초마다 실행
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
    return (
        <div style={{ position: 'relative' }}>
            {inform && <div className='pop_up' style={{ marginLeft: '720px', top: '139px' }} ref={background}
                onClick={e => {
                    if (e.target === background.current) {
                        setInform(false);
                    }
                }}>
                {/* style={{ border: "10px solid red"}} */}
                <Popup value={selected} ></Popup>
                <button className="sit_button" onClick={closing}>닫기</button>
            </div>}
            <br /> <br /> <br />
            <div style={{ position: 'absolute', display: 'contents' }}>
                <div className='row_blank' >
                    {arr1.map((elem) => {
                        return (<button key={elem} 
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr2.map((elem) => {
                        return (<button key={elem} 
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br /><br /><br /><br /><br /><br />
                    {arr3.map((elem) => {
                        return (<button key={elem} 
                                                                className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                        onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr4.map((elem) => {
                        return (<button key={elem} 
                            className={(sitList.find(item => item == "자리" + elem)) ? "sit_button_change" : "sit_button"}
                            onClick={() => {
                            console.log('1');
                            setInform(true);
                            setSelected(elem);
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