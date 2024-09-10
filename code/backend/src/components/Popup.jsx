import React, {useState} from 'react'

const Popup = (props) => {

  return (
    // className='pop_up'
    <div>
        <div >
            <h3>자리 이름: {props.value}</h3>
            <h3>패널 번호: "패널 식별자(DB)" </h3>
            <h3>위치: "패널 설치 위치(DB)" </h3>
            <h3>현재 상태: "센서 이상치(DB 콘텍스트?)"</h3>
        </div>
    </div>
  )
}

export default Popup