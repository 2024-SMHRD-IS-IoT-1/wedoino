import React from 'react'
import Car from './Car'

function Park() {
    const carPosition = {
        position: 'relative',
        top: 30,
        bottom: 30,
        left : 30
    }
    return (
        <div style={{ height: '500px' }}>
            <div style={carPosition}>
                <Car />
                <Car />
                <Car />
            </div>



        </div>
    )
}

export default Park