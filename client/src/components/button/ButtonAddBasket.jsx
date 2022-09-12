import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { updateStock } from "../../api/index";
import { UserAuth } from "../../contexts/AuthContext";
import {FaRegSmileWink} from "react-icons/fa";
import Photo from "../../assets/produit.jpg";
import { Link } from "react-router-dom";

const ButtonAddBasket = ({ produit }) => {
  const { contextBasket } = UserAuth();
  const [basket, setBasket] = contextBasket;
  let [isOpen, setIsOpen] = useState(false);
  
  const btnBgColor= "bg-indigo-600";
  function closeModal() {
    setIsOpen(false);
  }

 
  const onAdd = async () => {
    setIsOpen(true);
    try {
      //  const { data } = await getProductsId(id);
      const exist = basket.find((x) => x.id === produit.id);
      if (exist) {
        setBasket(
          basket.map((x) =>
            x.id === produit.id ? { ...exist, qty: exist.qty + 1 } : x
          )
        );
      } else {
        setBasket([...basket, { ...produit, qty: 1 }]);
      }
      await updateStock(produit?.id);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={onAdd}
        className={`no-underline text-white ${btnBgColor} hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
      >
        Ajouter au panier
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xg font-bold leading-6 text-gray-900 flex flex-col items-center content-center mt-6"
                  >
                    <FaRegSmileWink color="green" size={40} />{" "}
                    <span className="my-1">AJOUTER AU PANIER !</span>
                  </Dialog.Title>

                  <div className="mt-4 absolute top-0 right-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-xl font-medium hover:bg-gray-200 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </div>
                                  
                  <div className="flex my-4">
                    <div className="w-2/5">
                      <img src={produit?.images.length > 0
      ? process.env.REACT_APP_API_URL+produit?.images[0].src
      : Photo} alt={produit.title} />
                    </div>
                    <div className="w-3/5 flex-col ">
                      <p>{produit.title}</p>
                      <p>
                        <span>Prix : </span>
                        <span>{produit.price} €</span>
                      </p>
                    </div>
                  </div>

                  <div className="py-4 flex justify-center">
                    <Link
                      to="/checkout"
                      className={`${btnBgColor} hover:bg-blue-700 text-white  py-2 px-4 rounded`}
                    >
                      Finaliser la commande
                    </Link>
                    <Link
                      to="/basket"
                      className="hover:text-gray-600 py-2 px-4"
                    >
                      Voir le panier
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ButtonAddBasket;
