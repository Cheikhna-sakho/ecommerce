import React from "react";
import { NavLink } from "react-router-dom";

const Auth = () => {
  return (
    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
      <NavLink to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800 whitespace-nowrap no-underline">
        Me connecter
      </NavLink>
      <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
      <NavLink to="/register" className="text-sm font-medium text-gray-700 hover:text-gray-800 whitespace-nowrap no-underline">
        Créer un compte
      </NavLink>
    </div>
  );
};

export default Auth;
