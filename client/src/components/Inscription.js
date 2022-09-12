import React from 'react';
import {useState} from 'react';
import InputFull from './inputs/InputFull';
import InputSmall from './inputs/InputSmall';
import Button from './button/Button';
import { useNavigate } from 'react-router-dom';
import {registerAxios} from '../api/index';

export const Inscription = () => {

  const Navigate = useNavigate();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [adresse, setAdresse] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [error, setError] = useState("");

    const champsBottom = [
    {
      title: "Commune", 
      type: "text", 
      setData: setCity,
      id: "commune"
    },
    {
      title: "Code postale", 
      type: "text", 
      setData: setZipcode,
      id: "code-postale"
  }
    ]

    const champsSmall = [
      { 
        title: "Prénom", 
        type: "text", 
        setData: setFirstname,
        id: "firstname"
      },
      {
        title: "Nom", 
        type: "text", 
        setData: setLastname,
        id:"lastname"
      },
      {
        title: "Numéro de téléphone",
        type: "telephone",
        setData: setPhone,
        id: "phone"
      }
    ]

    const mesChampsFull = [
      {
        title: "Adresse email",
        type: "email",
        setData: setEmail,
        id: "email"
      },
      {
        title: "Mot de passe",
        type: "password",
        setData: setPassword,
        id: "password"
    },
    {
      title: "Retapez le mot de passe",
      type: "password",
      setData: setConfirmPassword,
      id: "confirmPassword"
    },
    {
      title: "Adresse postale",
      type: "address",
      setData: setAdresse,
      id: "address"
    }   
    ]
   
    const register = async (e) => {
    e.preventDefault();
    const donnees = {
      firstname,
      lastname,
      phone,
      email,
      password,
      adresse,
      city,
      zipcode
    }

    for(let data in donnees) {
      if (donnees[data] == "") {
        setError("Ce champs est obligatoire");
      }
    }
 
    if(password != confirmPassword){
      setError("Les mots de passes sont differents");
    }

    if(error != ""){
      console.log("Error");
    }

    try {
      const res = await registerAxios(donnees)
      
      alert("inscription réussie");
      console.log(res.data);
      Navigate('/login');
    } catch (err) {
      setError("Veillez renseigner les champs correctement");
      console.error(err);
    }
    // console.log(donnees);
  }


  return (

    <div className="container"><br/><br/>

    <p className="text-center" style={{color: "red"}}>{error}</p><br/>
    <p className="text-center text-gray-700 font-bold mb-2">Je crée mon compte</p>

    <form onSubmit={register} className="w-full h-full max-w-lg m-auto">
      <div className="flex flex-wrap -mx-3 mb-6">
  
        {champsSmall.map((champs, i) => (
          <InputSmall key={i} inputData={champs} />
        ))}
      </div>
  
      <div className="flex flex-wrap -mx-3 mb-6">
        {mesChampsFull.map((champ,i) => (
          <InputFull key={i} inputData={champ}/>
        ))}
      </div>
      <div className="flex flex-wrap -mx-3 mb-2">      
         {champsBottom.map((champ, i) => (
          <InputSmall key={i} inputData={champ}/>
         ))}
          <Button title={"Inscription"} />    
  
      </div>
    </form>
  </div>
  )
}

export default Inscription;