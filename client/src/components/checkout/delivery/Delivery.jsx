import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BsCheck2Circle } from "react-icons/bs";
import Layout from "../Layout";
import { getRates } from "../../../api";
import { UserAuth } from "../../../contexts/AuthContext";

const Delivery = () => {
  const { contextShipping, contextPort } = UserAuth();
  const [shipping] = contextShipping;
  const [port, setPort] = contextPort;
  const [deliveryMethods,setDeliveryMethods] = useState([])
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[1]||{});

  function classNames(...classes) {
      return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
     (async () => {
       if (!shipping) return;

       try {
         
         const donnees = {
           to_address: {
             name: `${shipping?.firstname} ${shipping?.lastname}`,
             street1: shipping?.address,
             city: shipping?.city,
             state: shipping?.apartment,
             country: "US",
             zip: shipping?.zipcode,
             phone: shipping?.phone,
           },
           parcel: {
             length: 20.2,
             width: 10.9,
             height: 5,
             weight: 65.9,
           },
         };

         const { data } = await getRates(donnees);
         console.log(data)
         const tracker = {
           "orderId": data[1],
           "tracker_url": data[2],
         };

        //  console.log("data", data);
         console.log("tracker", tracker );
        localStorage.setItem("track", tracker && JSON.stringify(tracker));

         setDeliveryMethods(data[0]);
         setSelectedDeliveryMethod(data[0][1]);
       } catch (err) {
         console.error(err);
       }
     })();
  }, [shipping]);
  
  useEffect(() => {
    if (selectedDeliveryMethod.rate)
      setPort(Number.parseFloat(selectedDeliveryMethod.rate));
  }, [selectedDeliveryMethod,port]);
  
  
  return (
    <Layout>
      <div className="mt-10 border-t border-gray-200 pt-10">
  
        <RadioGroup
          value={selectedDeliveryMethod}
          onChange={setSelectedDeliveryMethod}
        >
          <RadioGroup.Label className="text-lg font-medium text-gray-900">
            Delivery method
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {deliveryMethods.map((deliveryMethod) => (
              <RadioGroup.Option
                key={deliveryMethod.id}
                value={deliveryMethod}
                className={({ checked, active }) =>
                  classNames(
                    checked ? "border-transparent" : "border-gray-300",
                    active ? "ring-2 ring-indigo-500" : "",
                    "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <div className="flex-1 flex">
                      <div className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {deliveryMethod.service}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {deliveryMethod.delivery_days
                            ? deliveryMethod.delivery_days + " jours ouvrés"
                            : "1 jours ouvré"}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {deliveryMethod.rate} €
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked ? (
                      <BsCheck2Circle
                        className="h-5 w-5 text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-500" : "border-transparent",
                        "absolute -inset-px rounded-lg pointer-events-none"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </Layout>
  );
};

export default Delivery