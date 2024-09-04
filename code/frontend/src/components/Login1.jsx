import React, { useEffect, useState } from 'react'
import "../css/login1.css"
import instance from './Axios';
import { Link, useNavigate } from 'react-router-dom';


function Login1() {
    // const selectref = useRef();
    //전송데이터 -> state로 생성
    const [name, setname] = useState();
    const [pw1, setpw1] = useState();
    const [pwValid, setPwValid] = useState(false);

    const [birth, setbirth] = useState();
    const [phone, setphone] = useState();
    // const [email1, setemail1] = useState();
    // const [email2, setemail2] = useState();
    const nav = useNavigate();
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
    const sendData = () => {
        const userdata = {
            username: name,
            userpw1: pw1,
            userbirth: birth,
            userphone: phone
        }
        instance.post('/regist/permit', userdata)
        .then((res) => {
            console.log(res);
            alert("요청이 완료되었습니다.");
            nav('/');
        }).catch((err) => {
            console.log("[ERREOR] ", err);
            alert("요청을 실패했습니다. 다시 시도해 주십시오")
        })
    };
    

    useEffect(() => {
        if (name && pwValid && birth && phone) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [name, pwValid, birth, phone]);


    return (
        <div className='page'>
            <Link to='/'>
            <button style={{float:'left',width:'20%'}} className='bottomButton'>메인페이지로</button>
            </Link>
            <br />
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
                            if (pw1 === e.target.value) {
                                setPwValid(true);
                            } else {
                                setPwValid(false);
                            }

                        }} />
                </div>
                <div className="errorMessageWrap">
                    {!pwValid && (
                        <div>적절한 비밀번호를 입력해 주세요.</div>
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
            </div>


            <br /><br />
            <input className='bottomButton' type="submit" disabled={notAllow} value="등록요청" 
            onClick={sendData} />

        </div>
    )
}

export default Login1;