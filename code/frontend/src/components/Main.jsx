import {useRef, useState} from 'react'
import instance from './Axios' 
import '../css/main.css'
import Login from './Login'

function Main() {
    const [login,setlogin]=useState(false);
    return (
        <div>
            <header>
                <h1>프로젝트</h1>
                <div>
        <div>
            <input type='text' placeholder='주차장 위치를 입력하세요'
            onChange={(e)=>{
                showRef.current = e.target.value
                
            }}/> <span />
            <input type='submit' value={'검색'} onClick={()=>{
                console.log(showRef.current)
            }}/>
        
        </div>
            </header>
            <div  className='whole'>
        <div>
          <div className='whole'>
                <div className='box_full'>자리 1</div>
                <div className='box_green'>자리 2</div>
                <div className='box_green'>자리 3</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_green'>자리 4</div>
            <div className='box_green'>자리 5</div>
            <div className='box_full'>자리 6</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_green'>자리 7</div>
            <div className='box_full'>자리 8</div>
            <div className='box_green'>자리 9</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_full'>자리 10</div>
            <div className='box_green'>자리 11</div>
            <div className='box_full'>자리 12</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_full'>자리 13</div>
            <div className='box_green'>자리 14</div>
            <div className='box_green'>자리 15</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_green'>자리 16</div>
            <div className='box_green'>자리 17</div>
            <div className='box_full'>자리 18</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_green'>자리 19</div>
            <div className='box_full'>자리 20</div>
            <div className='box_green'>자리 21</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_full'>자리 22</div>
            <div className='box_green'>자리 23</div>
            <div className='box_full'>자리 24</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_full'>자리 25</div>
            <div className='box_green'>자리 26</div>
            <div className='box_green'>자리 27</div>
          </div>
            <br />
          <div className='whole'>
            <div className='box_green'>자리 28</div>
            <div className='box_green'>자리 29</div>
            <div className='box_full'>자리 30</div>
          </div>
          </div>
          <div>
            <div>자리 31</div>
            <div>자리 32</div>
            <div>자리 33</div>
            <div>자리 34</div>
            <div>자리 35</div>

            <div>자리 36</div>
            <div>자리 37</div>
            <div>자리 38</div>
            <div>자리 39</div>
            <div>자리 40</div>
            <div>자리 41</div>
            <div>자리 42</div>
            <div>자리 43</div>
            <div>자리 44</div>
            <div>자리 45</div>
          </div>
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
