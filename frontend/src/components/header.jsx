import React from 'react'
import "../css/header.css"
import LogOut from './userLogout';
const Header = () => {
    return (
        <div className='header'>
            <center>
                <h2>Make Your Note</h2>
            </center>
            <div className='logout'>
                <LogOut></LogOut>
            </div>
        </div>
    )
}

export default Header;