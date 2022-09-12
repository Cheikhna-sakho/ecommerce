import React from 'react'
import { Menu, Transition } from "@headlessui/react";
import { BsPerson } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CgLogOff } from "react-icons/cg";
import { UserAuth } from "../../contexts/AuthContext";

const Profil = ({ user }) => {
  const { contextToken } = UserAuth();
  const [token, setToken] = contextToken;
  const Navigate = useNavigate();

  const handleClear = () => {
    localStorage.removeItem("token");
    setToken(null);
    Navigate("/login");
  };

  return (
    <div className="flex items-center justify-center z-50">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                  <BsPerson className="w-6 h-6" aria-hidden="true" />
                  <span className="ml-3 flex items-center text-sm font-medium whitespace-nowrap">
                    {!user
                      ? "Mon compte"
                      : user?.firstname + " " + user?.lastname}
                  </span>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Connecté en tant que </p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/dashboard"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Gérer mes articles
                        </NavLink>
                      )}
                    </Menu.Item>
                    
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="#support"
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          Parametres du compte
                        </NavLink>
                      )}
                    </Menu.Item>
                    <Menu.Item
                      as="span"
                      disabled
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    >
                      New feature (soon)
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleClear}
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          } flex justify-around  items-center w-full px-4 py-2 text-sm leading-5 text-left`}
                        >
                          {" "}
                          <CgLogOff className="w-6 h-6 text-red-600" /> Deconnexion
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default Profil