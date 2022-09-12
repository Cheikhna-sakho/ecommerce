import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserAuth } from "../../../contexts/AuthContext";

const PaypalCheckoutButton = ({handleClick }) => {
    const { contextTotal, contextBasket, contextOrder } = UserAuth();
    const [total] = contextTotal;
    const [basket, setBasket] = contextBasket;
    const [order, setOrder] = contextOrder;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = (order) => {
    setBasket([]);
    setPaidFor(true);
    setOrder(order);
    
  };

  if (paidFor) {
    handleClick("next");
    setPaidFor(false);

  }

  if (error) {
    console.error(error);
  }

  return (
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        tagline: false,
        shape: "pill",
      }}
      onClick={(data, actions) => {
        // Validate on button click, client or server side
        const hasAlreadyBoughtCourse = false;

        if (hasAlreadyBoughtCourse) {
          setError(
            "You already bought this course. Go to your account to view your list of courses."
          );

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: "3MVC Les miracles de la science",
              amount: {
                value: total,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        handleApprove(order);
      }}
      onCancel={() => {
        // Display cancel message, modal or redirect user to cancel page or back to cart
      }}
      onError={(err) => {
        setError(err);
        console.error("PayPal Checkout onError", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
