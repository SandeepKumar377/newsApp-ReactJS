import React from 'react'
import loader from './loader.gif'

const Spinner = () => {
    return (
        <div className="text-center">
            <img src={loader} alt="loader"></img>
        </div>
    )
}

export default Spinner
