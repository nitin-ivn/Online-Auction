import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../../main';

function Header() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <div className='header'>
      <div className='d-flex align-items-center gap-2'>
        <img src="/logo1.svg" alt="Logo" />
        <h2 className='m-0 d-inline'>Online Auction</h2>
      </div>

      <div className="header-container">
        <Link to='/' className="header-btn">
          <p className='icon'>Home</p>
        </Link>
        <Link to='/list' className="header-btn">
          <p className='icon'>Auctions</p>
        </Link>

        {!user ? (
          <>
            <Link to='/login' className="header-btn">
              <p className='icon'>Sign In</p>
            </Link>
            <Link to='/register' className="header-btn">
              <p className='icon'>Sign Up</p>
            </Link>
          </>
        ) : (
          <>
            <Link to='/create-auction' className="header-btn">
              <p className='icon'>Create Auction</p>
            </Link>
            <button onClick={handleLogout} className="header-btn">
              <p className='icon'>Logout</p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
