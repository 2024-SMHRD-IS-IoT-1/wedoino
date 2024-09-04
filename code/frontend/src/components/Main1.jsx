import { createContext, useEffect, useState } from 'react';
import Login from './Login'
// import Panel from './panel';
import { useNavigate } from 'react-router-dom';
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

        <div style={{ height: '500px', backgroundColor: 'red' }}>
          {login ? <Login /> : <p>컴포넌트</p>}
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
