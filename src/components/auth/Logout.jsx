import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

const Logout = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    const handleLogout = () => {
       auth.handleLogout();
      //  window.location.reload();
       navigate("/login",{state:{message:"You have been logged out"} })
    }
    const isLoggedIn = true;
  return isLoggedIn ? (
      <>
        <li>
          <Link to={"/profile"} className="dropdown-item" >
            Profile
          </Link>
        </li>
        <li>
          <hr  className='dropdown-divider'/>
        </li>
        <button className='dropdown-item' onClick={handleLogout}>
            Logout
        </button>
      </>
  ) : null

}

export default Logout
