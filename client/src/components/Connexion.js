import React, { useState } from 'react'
import Button from './button/Button';
import {useNavigate} from 'react-router-dom';
import {UserAuth} from '../contexts/AuthContext';
import InputFull from './inputs/InputFull';
import {loginAxios} from '../api/index';


export const Connexion = ({path}) => {

  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { contextToken } = UserAuth();
  const [token, setToken] = contextToken;
  const [error, setError] = useState("");

  const mesChamps = [
    {
      id: "email",
      title: "E-mail",
      inputName:"Address email",
      type: "email",
      setData: setEmail
    },
    {
      id: "password",
      title: "Mot de passe",
      inputName:"Password",
      type: "password",
      setData: setPassword
    }
  ]


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const emailPassword = {
        email,
        password
      }

      const res = await loginAxios(emailPassword);
      const result = await res.data;
    
      setToken(result);
      // localStorage.setItem("token", JSON.stringify(result));

      console.log("---");
      Navigate(path);
      
    } catch (error) {
      setError("Identifiant ou mot de passe incorrect");
      console.log("error connexion", error);
    }
  }

  return (
    <div className="mt-50"><br/><br/><br/><br/><br/><br/>
      <p className="text-center" style={{color: "red"}}>{error}</p><br/>
      <p className="text-center text-gray-700 font-bold mb-2">Je me connecte</p>
      <form className="w-full h-full max-w-lg m-auto" onSubmit={(e)=> handleSubmit(e)}>
        <div className="flex flex-wrap -mx-3 mb-6">
            {mesChamps.map((champ,i) => <InputFull key={i} inputData={champ}/>)}
            <Button title="Connexion"/>
        </div>
    </form>
</div>
  )
}

export default Connexion;
