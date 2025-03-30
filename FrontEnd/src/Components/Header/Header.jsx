import React from 'react'
import './Header.css'
import { NavLink,Link } from 'react-router-dom'

function Header() {
  return (
    <>
    
        <div className='header '>

            <div className='d-flex align-items-center gap-2'>
                <img src="/logo1.svg" alt="" />
                <h2 className='m-0 d-inline'>Online Auction</h2>
            </div>

            <div class="header-container">
                <Link to='' class="header-btn">
                    <p className='icon'>Home</p>
                </Link>
                <Link to='/login' class="header-btn">
                    <p className='icon'>Sign In</p>
                </Link>
                <Link to='/register' class="header-btn">
                    <p className='icon'>Sign Up</p>
                </Link>
                <Link to={'/list'} class="header-btn">
                    <p className='icon'>Auction</p>
                </Link>
            </div>
        </div>

    
    </>
  )
}

export default Header