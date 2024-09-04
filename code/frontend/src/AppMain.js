// import './App.css';
import {Routes,Route } from 'react-router-dom';
import Main from'./components/Main1';
import Login1 from './components/Login1';
import Login2 from './components/Login2';
import Panel from './components/panel';
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/regist/request' element={<Login1/>}></Route>
        <Route path='/regist/permit' element={<Login2/>}></Route>
        <Route path='/panel' element={<Panel/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
