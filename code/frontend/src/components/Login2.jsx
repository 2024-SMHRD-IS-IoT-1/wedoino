import React from 'react'
import { useRef, useState, useEffect } from 'react'
import '../css/login2.css'
import instance from './axios'

const Login2 = () => {
    const [region, setRegion] = useState()
    const [position, setPosition] = useState()
    const [grade, setGrade] = useState()
    const [startdate, setStartdate] = useState()

    const [userDatas, setUserDatas] = useState({})
    // let option1 = [
    //     { value: "바나나", label: "바나나" },
    //     { value: "사과", label: "사과" },
    //     { value: "딸기", label: "딸기" },
    //     ];

    useEffect(() => {
        console.log(userDatas)
        //axios를 통한 데이터 전송
        try {
            const response = instance.post('/regist/permit',userDatas);
            console.log(response.userDatas);
        } catch (error) {
            console.log(error);
        }
    }, [userDatas])

    return (
        <div>
            <h3>홍길동(0000.00.00) 연락처 000-0000-0000 님의 사원 등록 요청입니다
                <br />아래 정보를 입력하고 등록 완료를 눌러주세요."</h3>
            <p>지역: <span />
                <select onChange={(e) => { 
                    setRegion(e.target.value)
                    e.target.style.color = "black"
                    console.log(e.target.value)
                    }}>
                    <option value="거주지역" style={{color:'grey'}}>거주지역</option>
                    <option value="SE">서울</option>
                    <option value="IC">인천</option>
                    <option value="DJ">대전</option>
                    <option value="PS">부산</option>
                    <option value="DG">대구</option>
                    <option value="GJ">광주</option>
                </select></p>
                

            <p>직급: <span />
                <select onChange={(e) => { setPosition(e.target.value) 
                    e.target.style.color = "black"
                    console.log(e.target.value)
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

            <p> 등급: <span />
                <select onChange={(e) => { setGrade(e.target.value) 
                    e.target.style.color = "black"
                    console.log(e.target.value)
                    }}>
                    <option value="접근 가능 등급">접근 가능 등급</option>
                    <option value="THIRD">일반 관리자</option>
                    <option value="SECOND">중간 관리자</option>
                    <option value="FIRST">최고 관리자</option>
                </select>
            </p>

            <p>입사일: <span />
            <input type='date'
                onChange={(e) => { setStartdate(e.target.value) 
                    console.log('입사일: ',e.target.value)
                }} /> </p>
            
            <br /><br />
            <input type='submit' value='등록 완료' onClick={()=>{
                setUserDatas({
                    userregion : region,
                    userposition : position,
                    usergrade : grade,
                    startingdate : startdate
                });
                console.log(userDatas)
            }}/>
        </div>
    )
}

export default Login2