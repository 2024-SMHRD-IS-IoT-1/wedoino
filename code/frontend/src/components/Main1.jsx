import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import instance from './Axios';
import Login from './Login';
import Parking from './Parking';
import Parking_row from './Parking_row';
import '../css/main.css'
import Popup from './Popup'; import { Data } from '../AppMain'

function App() {
  const nav = useNavigate();
  const { login, setlogin } = useContext(Data);
  const { Info, setInfo } = useContext(Data);

  const isLogin = () => {
    if (Info) {
      console.log("SSSSSSSSS")
      console.log(Info)
      nav('/panel');
    } else {
      console.log("dddddd")
      console.log(Info);
      setlogin(true);
    }
  }

  const logout = () => {
    instance.get('/logout')
      .then((res) => {
        console.log(res);
        if (res.data === "세션삭제") {
          setInfo();
          alert("logout");
        }
      })
      .catch((error) => {
        console.log(error);
      }
      )
  }

  return (
    <div>
      {/* Info가 있으면 바로 패널페이지로
            없으면 login 컴포넌트가 생기기 */}
      <div style={{ display: 'flex' }}>
        <button className="sit_button" onClick={isLogin}>
          <img src='img/logo.png' width={'100px'} alt='logo' />
        </button>
        <p style={{ fontSize: '35px', width: '70%', color: 'white' }}> 프로젝트</p>
        {
          Info ? <button  className='loginoutButton, sit_button' onClick={logout}>Logout</button>
            : <button className='loginoutButton, sit_button'
              onClick={() => {
                setlogin(login ? false : true)
              }} >Login</button>
        }
      </div>
      <div style={{ height: '800px', backgroundColor: 'lightgrey' }}>
        {login
          ? <Login />
          : <div style={{ display: 'flex' }}>
            <div className='whole' style={{ zIndex: 1 }}>
              <Parking />
            </div>
            <div style={{ marginLeft: '30px', zIndex: 1 }}>
              <br /><br /><br />
              <Parking_row />
            </div>
          </div>
        }
      </div>

    </div>
  );
}

export default App;
