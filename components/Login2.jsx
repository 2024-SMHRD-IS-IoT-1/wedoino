import React from 'react'
import { useRef, useState } from 'react'
import '../css/login2.css'
const Login2 = () => {
    const [region, setRegion] = useState()
    const [position, setPosition] = useState()
    const [grade, setGrade] = useState()
    const [startdate, setStartdate] = useState()

    const [userDatas, setUserdatas] = useState({})
    // let option1 = [
    //     { value: "바나나", label: "바나나" },
    //     { value: "사과", label: "사과" },
    //     { value: "딸기", label: "딸기" },
    //     ];


    return (
        <div>
            <h3>홍길동(0000.00.00) 연락처 000-0000-0000 님의 사원 등록 요청입니다
                <br />아래 정보를 입력하고 등록 완료를 눌러주세요."</h3>
            <p>지역: <span />
                <select onChange={(e) => { 
                    setRegion(e.target.value) 
                    e.target.style.color = "black"
                    console.log('지역: ',e.target.value)
                    }}>
                    <option value="거주지역" style={{color:'grey'}}>거주지역</option>
                    <option value="서울">서울</option>
                    <option value="인천">인천</option>
                    <option value="대전">대전</option>
                    <option value="부산">부산</option>
                    <option value="대구">대구</option>
                    <option value="광주">광주</option>
                </select></p>





            <p>직급: <span />
                <select onChange={(e) => { setPosition(e.target.value) 
                    e.target.style.color = "black"
                    console.log('직급: ',e.target.value)
                    }}>
                    <option value="현재 직급">현재 직급</option>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                    <option value="팀장">팀장</option>
                    <option value="과장">과장</option>
                    <option value="차장">차장</option>
                    <option value="부장">부장</option>
                </select>
            </p>
            <p> 등급:
                <select onChange={(e) => { setGrade(e.target.value) 
                    e.target.style.color = "black"
                    console.log('등급: ',e.target.value)
                    }}>
                    <option value="접근 가능 등급">접근 가능 등급</option>
                    <option value="1등급">1등급</option>
                    <option value="2등급">2등급</option>
                    <option value="3등급">3등급</option>
                </select>
            </p>

            <p>입사일</p>
            <input type='date'
                onChange={(e) => { setStartdate(e.target.value) 
                    console.log('입사일: ',e.target.value)
                }} />
        </div>
    )
}

export default Login2