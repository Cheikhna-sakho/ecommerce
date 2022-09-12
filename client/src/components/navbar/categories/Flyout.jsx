import React, {Fragment, useEffect, useState} from "react";
import {Popover, Transition } from "@headlessui/react";
import { getCategory, getCategoryId } from "../../../api";
import DisplaySubCategories from "./DisplaySubCategories";
import Featured from "./Featured";

const Flyout = ({ classNames }) => {
  // console.log(categories);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);



  const getSubCategory = async (id) => {
    try {
      const res = await getCategoryId(id);
      console.log("get sub",res);
      setSubCategories(res.data.subCategories);
      
    } catch (error) {
      console.log(error);
    }
  } 
  const GetCategories = async () => {
    try {
      const res = await getCategory();
      const categories = res.data
      setCategories(categories);
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    GetCategories();
  }, []);
  return (
    <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
      <div className="h-full flex space-x-8">
        {categories.map((category, index) => (
          <Popover key={index} className="flex">
            {({ open }) => (
              <>
                <div className="relative flex">
                  <Popover.Button    
                    className={classNames(
                      open
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-700 hover:text-gray-800",
                      "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                    )}   
                  >
                    <div
                      id={category.id} 
                      onClick={(e) => getSubCategory(e.target.id)}
                    >
                    {category.name}

                    </div>
                  </Popover.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                    <div
                      className="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />
                    <div className="relative bg-white">
                      <div className="max-w-7xl mx-auto px-8">
                        <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                          <Featured index={index}/>
                          <DisplaySubCategories subCat={subCategories}/>
                        </div>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        ))}
      </div>
    </Popover.Group>
  );
};

export default Flyout