import { Component, createContext, useEffect, useState } from 'react';
import Login from './Login'
// import Panel from './panel';
import { useNavigate } from 'react-router-dom';
import Parking from './Parking';
import Parking_row from './Parking_row';
import '../css/main.css'
import Popup from './Popup';
export const Data = createContext();

function App() {
  const nav = useNavigate();
  const [login, setlogin] = useState(false);
  const [trainerInfo, setTrinerInfo] = useState({});
  
  
  useEffect(() => {
    setTrinerInfo(JSON.parse(sessionStorage.getItem('trainer')));
  }, [])
  
  

  return (
    <div>
      <Data.Provider
        value={{
          trainerInfo
        }}>

        <h1>프로젝트</h1>

        <div style={{ height: '800px', backgroundColor: 'lightgrey' }}>
          {login
            ? <Login />
            : <div style={{ display: 'flex' }}>      
                <div className='whole'style={{zIndex:1}}>
                  <Parking />
                </div>
                <div style={{ marginLeft: '30px', zIndex:1}}>
                  <br /><br /><br />
                  <Parking_row />
                </div>
              </div>
            }
        </div>

        <footer>
          <button onClick={() => {
            !trainerInfo
              ? setlogin(login ? false : true)
              : nav('/panel')
          }} >패널관리</button>
        </footer>

      </Data.Provider>
    </div>
  );
}

export default App;
