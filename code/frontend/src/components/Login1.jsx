import React, { useEffect, useRef, useState } from 'react'
import "../css/login1.css"
import instance from '../asios';


function Login1() {
    const selectref = useRef();
    //전송데이터 -> state로 생성
    const [name, setname] = useState();
    const [pw1, setpw1] = useState();
    const [pw2, setpw2] = useState();
    const [pwValid, setPwValid] = useState(false);

    const [birth, setbirth] = useState();
    const [phone, setphone] = useState();
    // const [email1, setemail1] = useState();
    // const [email2, setemail2] = useState();

    const [notAllow, setNotAllow] = useState(true);


    // const change = (e) => {
    //     if (e.target.value == '직접입력') {
    //         selectref.current.disabled = false
    //         selectref.current.value = ''
    //     }
    //     else selectref.current.value = e.target.value
    //     if (email1)
    //         setemail2(email1 + '@' + selectref.current.value)
    // }

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
    useEffect(() => {
        console.log(userdata)
        //axios를 통한 데이터 전송
        try {
            const response = instance.post('/regist/permit', userdata);
            console.log(response.userdata);
        } catch (error) {
            console.log(error);
        }
    }, [userdata])

    useEffect(() => {
        if (name&&pwValid&&birth&&phone) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [name, pwValid, birth, phone]);


    return (
        <div className='page'>

            <h1>사원등록</h1>
            <div className="contentWrap">
                <p>이름</p>
                <div className="inputWrap">
                    <input type="text" placeholder='이름'
                        onChange={(e) => {
                            setname(e.target.value);
                        }} />
                </div>


                <p>비밀번호</p>
                <div className="inputWrap">
                    <input type="password" placeholder='비밀번호'
                        onChange={(e) => {
                            setpw1(e.target.value);
                        }} />
                </div>


                <p>비밀번호 재확인</p>
                <div className="inputWrap">
                    <input type="password" placeholder='비밀번호 재확인'
                        onChange={(e) => {
                            if (pw1 == e.target.value) {
                                setPwValid(true);
                                setpw2(e.target.value);
                            } else {
                                setPwValid(false);
                            }

                        }} />
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && (
                        <div>올바른 이메일을 입력해주세요.</div>
                    )}
                </div>


                <p>생년월일</p>
                <div className="inputWrap">
                    <input type="date" data-placeholder='생년월일'
                        onChange={(e) => {
                            setbirth(e.target.value);
                        }} />
                </div>


                <p>핸드폰번호</p>
                <div className="inputWrap">
                    <input type="text" placeholder='핸드폰번호'
                        onChange={(e) => {
                            setphone(e.target.value);
                        }} />
                </div>


                {/* <p>이메일</p>
                <div className="inputWrap">
                    <input type="text" placeholder='이메일' className='email'
                        onChange={(e) => {
                            setemail1(e.target.value);
                        }} />@
                    <input type="text" className='email' ref={selectref} disabled
                        placeholder='-----.com'
                        onChange={(e) => {
                            setemail2(email1 + '@' + e.target.value);
                        }} />
                    <select onChange={change}>
                        <option value="gmail.com">gmail.com</option>
                        <option value="naver.com">naver.com</option>
                        <option value="hanmail.net">hanmail.com</option>
                        <option value="직접입력">직접입력</option>
                    </select>
                </div> */}


            </div>


            <br /><br />
            <input className='bottomButton' type="submit" disabled={notAllow} value="등록요청" onClick={() => {
                setuserdata({
                    username: name,
                    userpw1: pw1,
                    userpw2: pw2,
                    userbirth: birth,
                    userphone: phone
                    // useremail: email2
                });
            }} />

        </div>
    )
}

export default Login1;