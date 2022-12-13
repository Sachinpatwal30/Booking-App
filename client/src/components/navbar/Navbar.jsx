import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import "./navbar.css";

export default function Navbar() {

  const { user, dispatch } = useContext(AuthContext);

  const handleClick = () => {

    dispatch({ type: "LOG_OUT" });

  }


  return (
    <div className='navbar'>

      <div className="navContainer">


        <Link className='link' to="/">
          <span className="logo">Booking.com</span>
        </Link>

        {user ? (<div className="navItems">

          <button className="navButton" onClick={handleClick}>Logout</button>
        </div>) : (<div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>)}

      </div>







    </div>
  )
}
