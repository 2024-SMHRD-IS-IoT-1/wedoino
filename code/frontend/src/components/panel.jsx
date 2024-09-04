import React from 'react'
import { Link } from 'react-router-dom'

function panel() {
    return (
        <div>
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