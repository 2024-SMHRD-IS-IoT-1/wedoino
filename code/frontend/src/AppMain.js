// import './App.css';
import {Routes,Route } from 'react-router-dom';
import {createContext, useEffect, useState} from 'react';

import Main from'./components/Main1';
import Login1 from './components/Login1';
import Login2 from './components/Login2';
import Panel from './components/Panel';

export const Data = createContext();


function App() {
  const [Info, setInfo] = useState();
  const [login, setlogin] = useState(false);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setInfo(JSON.parse(sessionStorage.getItem('info')));
    console.log(Info);
  }, [])

  return (
    <div>
      <Data.Provider
        value={{Info, 
                setInfo,
                login,
                setlogin,
                selected,
                setSelected}}>
        <Routes>
          {/* {
            !Info ? (<Route path='/' element={<Main/>}></Route>)
                  : (<Route path='/' element={<Panel/>}></Route>)
          } */}
          <Route path='/' element={<Main/>}></Route>
          <Route path='/regist/request' element={<Login1/>}></Route>
          <Route path='/regist/permit' element={<Login2/>}></Route>
          <Route path='/panel' element={<Panel/>}></Route>
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
