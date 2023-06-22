import React from 'react'
import { Link } from 'react-router-dom'
// import GoogleAuth from './GoogleAuth'
import LoginButton from './LoginButton'
const Header = ()=>{
    return (<div className='ui secondary pointing menu'>
        <Link to='/' className="item">
            StreamNet
        </Link>
        <div className="right menu">
        <Link to='/' className="item">
            All streams 
        </Link>
        <LoginButton />
        </div>
    </div>)
}
export default Header