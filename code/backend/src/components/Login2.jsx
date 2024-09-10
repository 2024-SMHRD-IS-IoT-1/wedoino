import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import '../css/login2.css'
import instance from './Axios'
import { Link } from 'react-router-dom'

const Login2 = () => {
    const [region, setRegion] = useState()
    const [position, setPosition] = useState()
    const [grade, setGrade] = useState()
    const [startdate, setStartdate] = useState()

    const [userDatas, setUserDatas] = useState({})
    const phone = useRef();
    const permit = useRef();
    const [phoneValid, setPhoneValid] = useState(true);
    const [user, setUser] = useState({
        emp_name: '',
        emp_birthdate: '',
        emp_phone: ''
    });
    const sarch = () => {
        //axios를 통한 데이터 전송
        instance.post('/regist/permit', { userphone: phone.current.value })
            .then((res) => {
                console.log(res)
                if (res.data != "실패") {
                    setUser(res.data[0])
                    console.log(phone.current.value);
                    permit.current.style.visibility = 'visible';
                    console.log(('' + user.emp_birthdate).substring(0, 10))
                } else {
                    setPhoneValid(false);
                }
            }).catch((error) => {
                console.log(error);
            })
    }
    const fin = () => {
        setUserDatas({
            user_phone: user.phone,
            user_region: region,
            user_position: position,
            user_grade: grade,
            starting_date: startdate
        })
        console.log(userDatas);
        instance.post('/regist/permit', userDatas)
            .then((res) => {
                console.log(res);
            }).catch((error) => {
                console.log(error);
            })

    }

    return (
        <div className='page'>
            <br />
            <div>
                <Link to='/panel'>
                    <button style={{float:'left'}} className='bottomButton_s'>이전으로</button>
                </Link>
                <Link to='/'>
                    <button style={{float:'right'}} className='bottomButton_s'>메인으로</button>
                </Link>
            </div>
            <br />
            <div className='serchPage'>
                <input type="text" placeholder='핸드폰 번호를 통해 사원 검색' ref={phone} />
                <button onClick={sarch}>Q</button>
                <div className="errorMessageWrap">
                    {!phoneValid && (
                        <div>핸드폰 번호를 다시 확인해주십시오.</div>
                    )}
                </div>
            </div>

            <br />
            <div className='permitPage' ref={permit}>
                <h3 className='h3'>{user.emp_name}({('' + user.emp_birthdate).substring(0, 10)}) {user.emp_phone} 님의 사원 등록 요청입니다
                    <br />아래 정보를 입력하고 등록 완료를 눌러주세요.</h3>
                <div className="contentWrap">
                    <p>지역</p>
                    <select onChange={(e) => {
                        setRegion(e.target.value)
                        e.target.style.color = "black"
                        console.log(e.target.value)
                    }}>
                        <option value="거주지역" style={{ color: 'grey' }}>거주지역</option>
                        <option value="SE">서울</option>
                        <option value="IC">인천</option>
                        <option value="DJ">대전</option>
                        <option value="PS">부산</option>
                        <option value="DG">대구</option>
                        <option value="GJ">광주</option>
                    </select>


                    <p>직급</p>
                    <select onChange={(e) => {
                        setPosition(e.target.value)
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


                    <p> 등급 </p>
                    <select onChange={(e) => {
                        setGrade(e.target.value)
                        e.target.style.color = "black"
                        console.log(e.target.value)
                    }}>
                        <option value="접근 가능 등급">접근 가능 등급</option>
                        <option value="THIRD">일반 관리자</option>
                        <option value="SECOND">중간 관리자</option>
                        <option value="FIRST">최고 관리자</option>
                    </select>

                    <p>입사일</p>
                    <input type='date'
                        onChange={(e) => {
                            setStartdate(e.target.value)
                            console.log('입사일: ', e.target.value)
                        }} />
                </div>
                <br /><br />
                <input className='bottomButton' type='submit' value='등록 완료'
                    onClick={fin} />
            </div>

        </div>
    )
}

export default Login2