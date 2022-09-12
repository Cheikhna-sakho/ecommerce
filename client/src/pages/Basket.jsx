import React from "react";
import Item from "../components/basket/Item";
import { UserAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { updateStock } from "../api/index";

const Basket = () => {
   const {
     contextBasket,
     contextTotal,
     contextTotalCommande,
     contextPort,
   } = UserAuth();

  const [basket, setBasket] = contextBasket;
  const [total] = contextTotal;
  const [port] = contextPort;
  const [totalCommande] = contextTotalCommande;

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
      await updateStock(product.id);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  const onDelete = async (product) => {
    try {
      const exist = basket.find((x) => x.id === product.id);
      if (exist) {
        setBasket(basket.filter((x) => x.id !== product.id));
      }
      // await updateStock(id);
    } catch (error) {
      console.log("error", error);
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
      // await updateStock(id);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <section className="m-4">
      <h1 className="font-bold text-xl">Panier</h1>
      <div>
        <div className="flex justify-between px-4 border-b-2 border-gray-200 py-5"></div>
        {basket.map((item, index) => (
          <Item
            key={index}
            basket={item}
            onAdd={onAdd}
            onRemove={onRemove}
            onDelete={onDelete}
          />
        ))}

        {basket.length !== 0 && (
          <>
            <div className="border-b-2 border-gray-200 py-5">
              <p className="flex justify-between">
                <span>Sous-total de la commande :</span>
                <span>{totalCommande.toFixed(2)} €</span>
              </p>
              <p className="flex justify-between">
                <span>Estimation des frais de livraison :</span>
                <span>{port} €</span>
              </p>
            </div>

            <div className="py-6 border-b-2 border-gray-200">
              <p className="flex justify-between text-xl text-blue-700 font-bold">
                <span>Total</span>
                <span> {total.toFixed(2)} € </span>
              </p>
            </div>

            <div className="py-4 flex justify-center">
              <Link
                to="/checkout"
                className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded"
              >
                Finaliser la commande
              </Link>
              <Link to="/" className="hover:text-gray-600 py-2 px-4">
                Continuer mes achats
              </Link>
            </div>
          </>
        )}

        {basket.length === 0 && (
          <p className="flex justify-center m-4">Panier vide</p>
        )}
      </div>
    </section>
  );
};

export default Basket;
