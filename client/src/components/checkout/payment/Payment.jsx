import React, { useState } from 'react'
import RadioPayment from '../../inputs/RadioPayment';
import Layout from '../Layout';
import CreditCard from './CreditCard';
import PaypalCheckoutButton from './PaypalCheckoutButton';

const Payment = ({ handleClick }) => {
  const handleOptionChange = (e) => {
    const id = parseInt(e.target.dataset.id);
    setSelected(paymentMethods[id]);
  };

  const paymentMethods = [
    {
      dataId: 0,
      id: "payPal",
      type: "radio",
      name: "payment-type",
      value: "PayPal",
      className:
        "focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300",
      title: "PayPal",
      onChange: handleOptionChange,
    },
    {
      dataId: 1,
      id: "credit_card",
      type: "radio",
      name: "payment-type",
      value: "Credit card",
      className:
        "focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300",
      title: "Credit card",
      onChange: handleOptionChange,
    },
  ];

  const [selected, setSelected] = useState(paymentMethods[0]);

  const component = [
    <PaypalCheckoutButton handleClick={handleClick} />,
    <CreditCard />,
  ];

  return (
    <Layout>
      <div className="mt-10 border-t border-gray-200 pt-10">
        <h2 className="text-lg font-medium text-gray-900">Payment</h2>

        <fieldset className="mt-4">
          <legend className="sr-only">Payment type</legend>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center justify-around">
              {paymentMethods.map((paymentMethod) => (
                <RadioPayment
                  key={paymentMethod.id}
                  id={paymentMethod.id}
                  data-id={paymentMethod.dataId}
                  onChange={paymentMethod.handleOptionChange}
                  {...paymentMethod}
                />
              ))}
            </div>
          </div>
        </fieldset>

        <div className="my-4">{component[selected?.dataId]}</div>
      </div>
    </Layout>
  );
};

export default Payment