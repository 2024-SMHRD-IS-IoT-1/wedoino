import React, { useEffect, useRef, useState } from 'react'
import "../css/request.css"
import instance from '../asios';


function Test() {
    const selectref = useRef();
    //전송데이터 -> state로 생성
    const [name, setname] = useState();
    const [pw1, setpw1] = useState();
    const [pw2, setpw2] = useState();
    const [birth, setbirth] = useState();
    const [phone, setphone] = useState();
    const [email1, setemail1] = useState();
    const [email2, setemail2] = useState();

    const change = (e) => {
        if (e.target.value == '직접입력') selectref.current.disabled = false
        else selectref.current.value = e.target.value
        setemail2(email1 + '@' + selectref.current.value)
    }

    const [userdata, setuserdata] = useState({});
    // axios를 통한 데이터 전송
    // const sendData = async (e) => {
    //     //form 전송 이벤트 방지
    //     e.preventDefault()
    //     console.log("funtion sendData", userdata)

    //     //axios를 통한 데이터 전송
    //     try {
    //         const response = await instance.post('/regist/permit', userdata);
    //         console.log(response.userdata);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // useEffect(async (e) => {
    //     //form 전송 이벤트 방지
    //     e.preventDefault()
    //     console.log("funtion sendData", userdata)

    //     //axios를 통한 데이터 전송
    //     try {
    //         const response = await instance.post('/regist/permit', userdata);
    //         console.log(response.userdata);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [userdata])
    useEffect(()=>{
        console.log(userdata)
        //axios를 통한 데이터 전송
        try {
            const response = instance.post('/regist/permit', userdata);
            console.log(response.userdata);
        } catch (error) {
            console.log(error);
        }
    },[userdata])
    return (
        <div>

            <h1>사원등록</h1>

            <p>이름</p>
            <input type="text" placeholder='이름'
                onChange={(e) => {
                    setname(e.target.value);
                }} />

            <p>비밀번호</p>
            <input type="password" placeholder='비밀번호'
                onChange={(e) => {
                    setpw1(e.target.value);
                }} />

            <p>비밀번호 재확인</p>
            <input type="password" placeholder='비밀번호 재확인'
                onChange={(e) => {
                    setpw2(e.target.value);
                }} />

            <p>생년월일</p>
            <input type="date" placeholder='생년월일'
                onChange={(e) => {
                    setbirth(e.target.value);
                }} />

            <p>핸드폰번호</p>
            <input type="text" placeholder='핸드폰번호'
                onChange={(e) => {
                    setphone(e.target.value);
                }} />

            <p>이메일</p>
            <input type="text" placeholder='이메일' className='email'
                onChange={(e) => {
                    setemail1(e.target.value);
                }} />@
            <input type="text" className='email' ref={selectref} disabled
                onChange={(e) => {
                    setemail2(email1 + '@' + e.target.value);
                }} />
            <select onChange={change}>
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="hanmail.net">hanmail.com</option>
                <option value="직접입력">직접입력</option>
            </select>


            <br /><br />
            <input type="submit" value="등록요청" onClick={() => {
                setuserdata({
                    username: name,
                    userpw1: pw1,
                    userpw2: pw2,
                    userbirth: birth,
                    userphone: phone,
                    useremail: email2
                });
            }} />

        </div>
    )
}

export default Test