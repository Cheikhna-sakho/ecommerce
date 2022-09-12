import React from 'react'
import { useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
import { UserAuth } from "../../../contexts/AuthContext";

const Logout = () => {
    const { contextToken } = UserAuth();
    const [token, setToken] = contextToken;

    const Navigate = useNavigate();

    const handleClear = () => {
      localStorage.removeItem("users");
      setToken(null);
      Navigate("/login");
    };
    
  return (
    <>
      <button onClick={handleClear}> <CgLogOff/> Deconnexion </button>
    </>
  );
}

export default Logout