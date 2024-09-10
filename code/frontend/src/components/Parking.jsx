import React, { useContext, useRef, useState } from 'react'
import '../css/parking.css'
import Popup from './Popup'
import { Data } from '../AppMain';


const Parking = () => {
    const [inform, setInform] = useState(true);
    const {selected, setSelected} = useContext(Data);
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

    const view = () => {
        return
    }
    // style={{position:'absolute'}}
    return (
        <div style={{ position: 'relative' }}>
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
            <div >
                <div style={{ display: 'flex' }}>
                    <div className='normal_blank'>
                        {arr1.map((elem) => {
                            return (<button className="sit_button" onClick={() => {
                                console.log('1');
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
                        {arr2.map((elem) => {
                            return (<button className="sit_button" onClick={() => {
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
                            return (<button className="sit_button" onClick={() => {
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