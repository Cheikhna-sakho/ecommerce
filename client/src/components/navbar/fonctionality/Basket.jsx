import { RiShoppingBag2Line } from "react-icons/ri";
import { Popover, Transition } from "@headlessui/react";
import photo from "../../../assets/casque.jpg";
import { Link } from "react-router-dom";
import { UserAuth } from "../../../contexts/AuthContext";
import Photo from '../../../assets/produit.jpg';
import OrderPrice from "./OrderPrice";

const Basket = () => {
  const { contextBasket, contextTotal, contextTotalCommande, contextPort } = UserAuth();
  const [basket] = contextBasket;
  const [total] = contextTotal;
  const [port] = contextPort;
  const [totalCommande] = contextTotalCommande;    
  
  return (
    <div className="relative ml-4 flow-root lg:ml-6 panier">
      <Link
        to="/basket"
        className={`group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <RiShoppingBag2Line />
        <span> {basket.length}</span>
      </Link>
      <div className="deroulant shadow hover:shadow-lg">
        <h3 className="text-lg text-center">Panier</h3>
        <div className="flex-col overflow-auto">
          {basket.map((item, index) => (
            <div
              key={index}
              className="flex justify-between px-4 border-b-2 border-gray-200 py-5"
            >
              <div className="w-4/5 flex">
                <div className="w-14 mr-6">
                  <img
                    src={
                      item?.images.length > 0
                        ? process.env.REACT_APP_API_URL + item?.images[0].src
                        : Photo
                    }
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col">
                  <p>{item.title}</p>
                  <p>
                    <span>Quantité : </span>
                    <span>{item.qty}</span>
                  </p>
                </div>
              </div>

              <div className="w-1/5 flex justify-end">
                <span>{(item.qty * item.price).toFixed(2)} €</span>
              </div>
            </div>
          ))}

          {basket.length !== 0 && (
            <>
              <div className="border-b-2 border-gray-200 py-5">
                <OrderPrice description={"Sous-total de la commande"} price={totalCommande.toFixed(2)}/>
                <OrderPrice description={"Estimation des frais de livraison"} price={port.toFixed(2)}/>
              </div>

              <div className="py-6 border-b-2 border-gray-200">
              <OrderPrice description={"Total"} price={total.toFixed(2)} addClass={"text-xl text-blue-700 font-bold"}/>
                {/* <p className="flex justify-between text-xl text-blue-700 font-bold">
                  <span>Total</span>
                  <span> {total.toFixed(2)} € </span>
                </p> */}
              </div>

              <div className="py-4 flex justify-center">
                <Link
                  to="/checkout"
                  className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
                >
                  Finaliser la commande
                </Link>
                <Link to="/basket" className="hover:text-gray-600 py-2 px-4">
                  Voir le panier
                </Link>
              </div>
            </>
          )}
          {basket.length === 0 && (
            <p className="flex justify-center m-4">Panier vide</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Basket;
