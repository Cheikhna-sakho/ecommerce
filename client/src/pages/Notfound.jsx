import React from 'react'
import { Link, useLocation } from "react-router-dom";



const Notfound = () => {
   const { pathname } = useLocation();
   console.log("parms", pathname); 
  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-white">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">404</div>

          <p className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            la page <span className="text-indigo-500"> {pathname} </span>n'existe pas
          </p>

          <p className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl my-8">
            La page <span className="text-indigo-500"> {pathname} </span> que vous recherchez est introuvable
          </p>

          <div className="text-gray-400 font-medium tex-lg my-4 ">
            <Link to="/" className="border bottom-2 border-indigo-200 m-5 p-2">Retourner sur la page d'accueil{" "}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notfound;