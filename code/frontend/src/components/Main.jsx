import React, { useState } from 'react'
import Login from './Login'

function Main() {
    const [login,setlogin]=useState(false);
    return (
        <div>
            <header>
                <h1>프로젝트</h1>
            </header>
            <div style={{ backgroundColor: 'red' }}>
                {login ? <Login /> : <p>컴포넌트</p>}
            </div>
            <footer>
                <button onClick={() => {
                    setlogin(login ? false : true)
                }} >패널관리</button>
            </footer>
        </div>
    )
}

export default Main