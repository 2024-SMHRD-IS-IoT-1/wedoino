import React from 'react'
import {useRef, useState} from 'react'
import instance from './Axios' 
import '../css/main.css'

const Main = () => {
    const [place,setPlace] = useState()
    const showRef = useRef();

  return (
    <div>
        <div>
            <input type='text' placeholder='주차장 위치를 입력하세요'
            onChange={(e)=>{
                showRef.current = e.target.value
                
            }}/> <span />
            <input type='submit' value={'검색'} onClick={()=>{
                console.log(showRef.current)
            }
        }/>
        console.log(showRef.current)
        </div>
        <br /><br />
        <div className='whole'>
            <div className='box_red'>주차장 자리 1</div>
            <div className='box_green'>주차장 자리 2</div>
            <div className='box_red'>주차장 자리 3</div>
            <div className='box_green'>주차장 자리 4</div>
            <div className='box_red'>주차장 자리 5</div>
        </div>
        <br /><br />
        <input type='button' value={'패널관리'}></input>
        
    </div>
     )
    }

export default Main