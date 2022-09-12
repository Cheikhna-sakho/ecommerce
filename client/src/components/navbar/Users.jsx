import React from 'react';
import Profil from './Profil';
import { UserAuth } from "../../contexts/AuthContext";
import Auth from './status/Auth';
import SearchBar from './fonctionality/SearchBar';
import Basket from './fonctionality/Basket';
import {updateStock } from "../../api/index"

const Users = () => {
  const { contextUser, contextBasket } = UserAuth();
  const [user] = contextUser;
  const [basket, setBasket] = contextBasket;

  const onAdd = async (product) => {
    try {
     const exist = basket.find((x) => x.id === product.id);
     if (exist) {
       setBasket(
         basket.map((x) =>
           x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
         )
       );
     } else {
       setBasket([...basket, { ...product, qty: 1 }]);
     }
      await updateStock(product.id)
    }
    catch (error) {
      console.log("error : ",error);
    }
   };

  const onRemove = async (product) => {
    try {
      const exist = basket.find((x) => x.id === product.id);
      if (exist.qty === 1) {
        setBasket(basket.filter((x) => x.id !== product.id));
      } else {
        setBasket(
          basket.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }
    }
    catch (error) {
      console.log("error", error);
    }
   };

  
  return (
    <div className="ml-auto flex items-center">
      <SearchBar
        text={"hidden lg:flex lg:items-center lg:justify-center lg:w-full"}
      />

      <div className="flex items-center lg:ml-6">
        {user ? <Profil user={user} /> : <Auth />}
      </div>

      {/* Cart */}
      <div className="ml-4 flow-root lg:ml-6 panier">
        <Basket/>
      </div>
    </div>
  );
}

export default Users