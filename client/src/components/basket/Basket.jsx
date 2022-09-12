import React from "react";
import photo from "../../assets/casque.jpg"

export default function Basket({ cartItems, onAdd, onRemove }) {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const totalPrice = itemsPrice;
    
  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}

        {cartItems.map((item, index) => (
          <div key={index} className="flex flex-wrap">
            <div className="w-1/5">
              <img src={photo} alt={item.title} />
            </div>
            <div className="w-4/5">
              <p>{item.title}</p>
              <div className="col-2">
                <button onClick={() => onRemove(item)} className="remove">
                  -
                </button>{" "}
                <button onClick={() => onAdd(item)} className="add">
                  +
                </button>
              </div>
            </div>
            <div className="col-2 text-right">
              {item.qty} x ${item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </div>
        )}
      </div>
    </aside>
  );
}
