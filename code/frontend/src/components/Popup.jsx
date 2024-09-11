import React from 'react'

const Popup = ({value,panel_idx,panel_location}) => {
  return (
    // className='pop_up'
    <div>
        <div >
            <h3>자리 이름: {value}</h3>
            <h3>패널 번호: {panel_idx} </h3>
            <h3>위치: {panel_location} </h3>
            <h3>현재 상태: "센서 이상치(DB 콘텍스트?)"</h3>
        </div>
    </div>
  )
}

export default Popup