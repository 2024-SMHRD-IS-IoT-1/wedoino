import React from 'react'
import { Link } from 'react-router-dom'

function panel() {
    return (
        <div>
            <Link to={'/'}>
                <button>
                    메인페이지로
                </button>
            </Link>
            panel page
            <Link to={'/regist/permit'}>
                <button>
                    등록 승인
                </button>
            </Link>
        </div>
    )
}

export default panel