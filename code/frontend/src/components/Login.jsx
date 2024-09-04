import React, { useContext, useEffect, useState } from 'react';
import instance from './Axios';
import '../css/login.css';
import { Data } from './Main1'

import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const { setTrainerInfo } = useContext(Data);

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
    await instance.post('/getData', { id: id, pw: pw })
      .then((res) => {
        console.log(res.data);
        alert(res.data);
        if (res.data == '성공') {
          console.log("ssssssss");
          nav('/panel');
          console.log("FFFFFFFFFFFF");
          // setTrainerInfo(res.data.trainer);
          // sessionStorage.setItem('trainer', JSON.stringify(res.data.trainer))
        }
        // setId('');
        // setPw('');
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
            <Link to={'/regist/request'}>
            <button className='bottomButton'>사원등록</button>
              </Link>
            <button onClick={sendData} disabled={notAllow} className="bottomButton">
              확인
            </button>
          </div>
        </div>
      </div>



    </div>
  );
}