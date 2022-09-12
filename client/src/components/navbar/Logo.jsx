import React from 'react'
import { NavLink} from "react-router-dom";
import imgLogo from "../../assets/logo.png";


const Logo = () => {
  
  return (
    <div className="ml-4 flex lg:ml-0">
      <NavLink to="/">
        <span className="sr-only">3MVC</span>
        <img className="h-8 w-auto" src={imgLogo} alt="logo du site 3MVC" />
      </NavLink>
    </div>
  );
}

export default Logo