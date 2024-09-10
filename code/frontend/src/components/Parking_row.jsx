import React, { useContext, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup';
import { Data } from '../AppMain';

const Parking_row = () => {

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
                        return (<button className="sit_button" onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr2.map((elem) => {
                        return (<button className="sit_button" onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br /><br /><br /><br /><br /><br />
                    {arr3.map((elem) => {
                        return (<button className="sit_button" onClick={() => {
                            console.log('1');
                            wantZero();
                            setInform(true);
                            setSelected(elem);
                        }}>자리{elem}
                        </button>)
                    })}
                    <br />
                    {arr4.map((elem) => {
                        return (<button className="sit_button" onClick={() => {
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