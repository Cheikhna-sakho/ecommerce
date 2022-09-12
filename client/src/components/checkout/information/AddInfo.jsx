import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import FormInput from "../../inputs/FormInput";

const AddInfo = ({ user, shipping, setShipping }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    address: "",
    apartment: "",
    city: "",
    zipcode: 0,
    country: "",
    phone: 0,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: "firstname",
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      errorMessage: "It should be a valid firstname",
      label: {
        text: "First Name",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      onChange: onChange,
    },
    {
      id: "lastname",
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      errorMessage: "It should be a valid Lastname",
      label: {
        text: "Last Name",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      onChange: onChange,
    },
    {
      type: "text",
      name: "address",
      id: "address",
      autoComplete: "street-address",
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      errorMessage: "It should be a valid address",
      label: {
        text: "Address",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      onChange: onChange,
    },
    {
      type: "text",
      name: "apartment",
      id: "apartment",
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      label: {
        text: "State",
        className: "block text-sm font-medium text-gray-700",
      },
      onChange: onChange,
    },
    {
      type: "text",
      name: "city",
      id: "city",
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      placeholder: "City",
      errorMessage: "City",
      label: {
        text: "City",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      onChange: onChange,
    },
    {
      type: "text",
      name: "country",
      id: "country",
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      placeholder: "country",
      errorMessage: "country empty",
      label: {
        text: "country",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      onChange: onChange,
    },
    // {
    //   type: "text",
    //   name: "province",
    //   id: "province",
    //   className:
    //     "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
    //   placeholder: "province",
    //   errorMessage: "province empty",
    //   label: {
    //     text: "province",
    //     className: "block text-sm font-medium text-gray-700",
    //   },
    //   required: true,
    //   onChange: onChange,
    // },
    {
      type: "number",
      name: "zipcode",
      id: "zipcode",
      className:
        "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
      placeholder: "zipcode",
      errorMessage: "Postal Code empty",
      label: {
        text: "Postal Code",
        className: "block text-sm font-medium text-gray-700",
      },
      required: true,
      onChange: onChange,
    },
    {
      id: "tel",
      name: "phone",
      type: "tel",
      placeholder: "phone",
      errorMessage: "phone number not valide",
      label: {
        text: "Phone",
        className: "block text-sm font-medium text-gray-700",
      },
    //   pattern: "^(?:0|(?+33)?s?|0033s?)[1-79](?:[.-s]?dd){4}$",
      required: true,
      onChange: onChange,
    },
  ];

  const closeModal =()=> {
    setIsOpen(false);
  }

  const openModal =() =>{
    setIsOpen(true);
  }
  
    useEffect(() => {
        if (shipping) {
        setValues({ ...shipping });
        }
    }, [shipping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShipping({ ...values });
    closeModal();
      // console.log("hello", shipping);
  };

  return (
    <>
      <div className="flex items-center justify-start">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          {!user ? "Ajouter une adresse" : "Modifier l'adresse"}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {!user ? "Ajouter une adresse" : "Modifier l'adresse"}
                  </Dialog.Title>
                  <form
                    className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    {inputs.map((input) => (
                      <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={input.onChange}
                      />
                    ))}

                    <button className="bg-green-300">Valider</button>
                  </form>

                  <div className="fixed top-4 right-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium  hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
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

export default AddInfo;
