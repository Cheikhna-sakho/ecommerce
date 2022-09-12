import React from 'react'
import { TiDelete } from "react-icons/ti";
import Photo from "../../assets/casque.jpg";
import OrderPrice from '../navbar/fonctionality/OrderPrice';

const Item = ({ basket, onAdd, onRemove, onDelete }) => {
  return (
    <div
      key={basket.id}
      className="flex justify-between items-center px-4 border-b-2 border-gray-200 py-5"
    >
      <div className="w-[60%] flex">
        <div className="w-14 mr-6">
          <img src={basket.images.length > 0
          ? process.env.REACT_APP_API_URL+basket.images[0].src
          : Photo} alt={basket.title} />
        </div>
        <div className="flex flex-col">
          <p>{basket.title}</p>
          <OrderPrice description={"Quantité"} price={basket.qty}/>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => onAdd(basket)}
          className="bg-blue-500 hover:bg-blue-700 text-xl font-bold py-2 px-4 text-white rounded mr-1"
        >
          +
        </button>
        <button
          onClick={() => onRemove(basket)}
          className=" bg-gray-500  hover:text-red-600 text-white text-xl font-bold py-2 px-4 rounded"
        >
          -
        </button>
      </div>
      <div className="w-[25%] flex justify-end">
        <span>{(basket.qty * basket.price).toFixed(2)} €</span>
      </div>
      <div className="flex justify-center w-[15%]">
        <button onClick={() => onDelete(basket)}>
          <TiDelete color="red" size={35} />
        </button>
      </div>
    </div>
  );
};

export default Item;