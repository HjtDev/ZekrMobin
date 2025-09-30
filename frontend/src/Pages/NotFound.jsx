import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/NotFound.css'

const NotFound = () => {
    return (
        <div className="notfound-container">
            <h1 className="notfound-title">404</h1>
            <Link to="/" className="ms_button">بازگشت به خانه</Link>
        </div>
    )
}
export default NotFound
