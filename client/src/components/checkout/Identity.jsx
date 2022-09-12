import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../contexts/AuthContext';
import Connexion from '../Connexion';

const Identity = () => {
  const { contextUserGuest } = UserAuth();
  const [userGuest, setUserGuest] = contextUserGuest;
  const [email, setEmail] = useState("");

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userGuest) {
        setUserGuest({ email });
       localStorage.setItem("userGuest", JSON.stringify({ email }));

      Navigate("/checkout");
    }
  };

  return (
    <div className="flex w-screen h-screen identity">
      <div className="login">
        <h2>J'ai déjà un compte</h2>
        <Connexion path="/checkout" />
        <Link to="/register"> Je crée mon compte</Link>
      </div>
      <div className="guest">
        {/* <h2>CONTINUER EN TANT QU'INVITÉ(E)</h2> */}
        <form onSubmit={handleSubmit} method="POST">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          
          <div className="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
            />
          </div>
          <button> CONTINUER EN TANT QU'INVITÉ(E) </button>
        </form>
      </div>

      {/* <div className="signup">
        <h2>Je crée mon compte</h2>
        <Link to="/register"> Je crée mon compte</Link>
      </div> */}
    </div>
  );
};

export default Identity;