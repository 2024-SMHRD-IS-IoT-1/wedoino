import React, { useEffect, useState } from 'react';
import instance from '../asios';
import '../css/login.css';
// const User = {
//   email: 'test@example.com',
//   pw: 'test2323@@@'
// }


export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  // const [emailValid, setEmailValid] = useState(false);
  // const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (id && pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [id,pw]);

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   const regex =
  //     /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  //   if (regex.test(e.target.value)) {
  //     setEmailValid(true);
  //   } else {
  //     setEmailValid(false);
  //   }
  // };
  // const handlePw = (e) => {
  //   setPw(e.target.value);
  //   const regex =
  //     /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  //   if (regex.test(e.target.value)) {
  //     setPwValid(true);
  //   } else {
  //     setPwValid(false);
  //   }
  // };
  const sendData= async (e)=>{
    //form 전송 이벤트 방지
    console.log("funtion sendData",id,pw)

    //axios를 통한 데이터 전송
    try{
        const response = await instance.post('/getData',{id: id, pw:pw})
        .then((res)=>{
          alert("로그인 성공"); 
        }).catch(()=>{
          alert("로그인 실패");
          setId();
          setPw();
        })
        console.log(response.id,response.pw);
    }catch(error){
        console.log(error);
    }
}

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className="contentWrap">
        <div className="inputTitle">사원 ID</div>
        <div
          className="inputWrap"
        >
          <input
            className="input"
            type="text"
            placeholder="사원 ID"
            value={id}
            onChange={(e)=>{setId(e.target.value)}}
          />
        </div>
        {/* <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div> */}

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="password"
            value={pw}
            onChange={(e)=>{setPw(e.target.value)}}
          />
        </div>
        {/* <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div> */}
        <br /><br />
        <div>
          <a href='/regist/requset'>사원등록</a>
          <button onClick={sendData} disabled={notAllow} className="bottomButton">
            확인
          </button>
        </div>
      </div>


    </div>
  );
}