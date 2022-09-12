import React from 'react'

const OrderPrice = ({description, price, addClass}) => {

    // const title = [
    //     "Sous-total de la commande :", "Estimation des frais de livraison :","Total"
    // ];
  return (
    <p className={`flex justify-between ${addClass}`}>
        <span>{description}: </span>
        <span>{price}</span>
    </p>
  )
}

export default OrderPrice