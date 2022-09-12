import React from 'react'
import { UserAuth } from '../../contexts/AuthContext';
import Photo from "../../assets/produit.jpg";

const SummaryOrder = () => {
   const {
     //  contextUser,
     contextBasket,
     contextTotal,
     contextTotalCommande,
     contextPort,
   } = UserAuth();
   //  const [user] = contextUser;
   const [basket] = contextBasket;
   const [total] = contextTotal;
   const [port] = contextPort;
  const [totalCommande] = contextTotalCommande;
  
  return (
    <div className="mt-10 lg:mt-0">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm overflow-y-hidden">
        <h3 className="sr-only">Items in your cart</h3>
        <ul className="divide-y divide-gray-200 flex flex-col items-start overflow-y-scroll h-full md:h-52">
          {basket.map((product) => (
            <li key={product.id} className="flex w-full py-6 px-4 sm:px-6">
              <div className="flex-shrink-0">
                <img
                  src={
                    product.images.length > 0
                      ? process.env.REACT_APP_API_URL + product.images[0].src
                      : Photo
                  }
                  alt={product.title}
                  className="w-20 rounded-md"
                />
              </div>

              <div className="ml-6 flex-1 flex flex-col">
                <div className="flex">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm">
                      <a
                        href={product.href}
                        className="font-medium text-gray-700 hover:text-gray-800"
                      >
                        {product.title}
                      </a>
                    </h4>
                  </div>

                  <div className="ml-4 flex-shrink-0 flow-root">
                    <label htmlFor="quantity" className="sr-only">
                      Quantity
                    </label>
                    <p className="bg-red-200 rounded-full p-2 w-8 h-8 text-sm text-center">
                      {product?.qty}
                    </p>
                  </div>
                </div>

                <div className="flex-1 pt-2 flex items-end justify-between">
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price} €
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
          <div className="flex items-center justify-between">
            <dt className="text-sm">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">
              {totalCommande} €
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm">Shipping</dt>
            <dd className="text-sm font-medium text-gray-900">{port} €</dd>
          </div>
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base font-medium">Total</dt>
            <dd className="text-base font-medium text-gray-900">{total} €</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SummaryOrder;