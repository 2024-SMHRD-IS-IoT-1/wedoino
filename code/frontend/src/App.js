// import './App.css';
import { useState } from 'react';
import Login from'./components/Login'

function App() {
  const [login,setlogin] = useState(false);
  return (
    <div>
      <h1>프로젝트</h1>
      <div style={{height:'500px',backgroundColor:'red'}}>
        {login ?<Login/> : <p>컴포넌트</p>}
      </div>
      <footer>
        <button onClick={()=>{
        setlogin( login ? false :true )
      }} >패널관리</button>
      </footer>
      

    </div>
  );
}

export default App;
