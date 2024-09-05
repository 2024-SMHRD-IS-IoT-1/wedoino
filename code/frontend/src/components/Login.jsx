import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import instance from './Axios';
import '../css/login.css';
//login session
import { Data } from '../AppMain'


export default function Login() {
  
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  //login session
  const { Info, setInfo } = useContext(Data);
  const {login, setlogin} = useContext(Data);


  const nav = useNavigate();


  // const [emailValid, setEmailValid] = useState(false);
  // const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (id && pw) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [id, pw]);


  const sendData = async (e) => {
    //form 전송 이벤트 방지
    // console.log("funtion sendData",id,pw)
    e.preventDefault();
    //axios를 통한 데이터 전송
    await instance.post('/login', { id: id, pw: pw })
      .then((res) => {
        console.log(res.data);
        alert(res.data.result);
        if (res.data.result === '로그인 성공') {
          setInfo(res.data.info);
          console.log("res.info",res.data.info);
          console.log("Info",Info);
          sessionStorage.setItem('info', JSON.stringify(res.data.info))
          nav('/panel');
        }

      })
      .catch((error) => {
        alert("로그인 실패");
        console.log(error);
      }
      )
  }

  return (
    <div className="page">
      <div>
        <br />
        <button className="bottomButton_s" onClick={()=>{
          setlogin(false);
        }}>메인페이지로</button>
        <div className="titleWrap">
          사원ID와 비밀번호를
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
              onChange={(e) => setId(e.target.value)}
            />
          </div>


          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          <br /><br />
          <div>
            <button onClick={sendData} disabled={notAllow} className="bottomButton">
              확인
            </button>
            <br /><br />
            <Link to={'/regist/request'}>
            <button className='bottomButton'>사원등록</button>
              </Link>
          </div>
        </div>
      </div>



    </div>
  );
}