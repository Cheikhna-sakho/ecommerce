import React from 'react'
// import Sidebar from '../components/dashboard/Sidebar'
import { RiSearchLine, RiXingFill, RiShoppingBag2Line } from "react-icons/ri";
import { getProducts } from "../api/index";
import { useState, useEffect } from "react";
import ProductItem from '../components/dashboard/ProductItem';
import Pagination from '../components/Pagination';
import {Link} from 'react-router-dom'
import { UserAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { contextArticles } = UserAuth();
  const [articles] = contextArticles;
  const [filterdata, setFilterdata] = useState([]);
  const ratio = 10;
  const [first, setFirst] = useState(0);
  const [end, setEnd] = useState(ratio);

     useEffect(() => {
       if (articles.length === 0) setFilterdata(articles.slice(0, 10));
       else {
         setFilterdata(articles.slice(first, end));
       }
     }, [first, end, articles]);

    return (
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
        <div className="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
          <div className="flex justify-between">
            <div className="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
              <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
                <div className="flex">
                  <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                    <RiSearchLine />
                  </span>
                  </div>
                <input
                  type="text"
                  className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
                  placeholder="Search"
                />
              </div>
            </div>
            <Link
              to={`/articles/add`}
              className="text-gray-100 text-lg font-medium rounded-md bg-green-600 p-2 no-underline"
            >
              Ajouter un article
            </Link>
            <Link
              to={`/categories`}
              className="text-gray-100 text-lg font-medium rounded-md bg-green-600 p-2 no-underline"
            >
              Ajouter une catégorie
            </Link>
          </div>
        </div>
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Ajouter du stock
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {!articles ? (
                <p>Null</p>
              ) : (
                filterdata.map(
                  ({ sub_categories, id, title, description, price, stock, caracteristic }) => (
                    <ProductItem
                      key={id}
                      id={id}
                      // id_user_id={id_user_id}
                      title={title}
                      description={description}
                      price={price}
                      stock={stock}
                      caracteristic={caracteristic}
                      sub_categories={sub_categories}
                    />
                  )
                )
              )}
            </tbody>
          </table>
          <div className="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
            <Pagination
              data={articles}
              ratio={ratio}
              first={first}
              setFirst={setFirst}
              end={end}
              setEnd={setEnd}
              filterdata={filterdata}
              setFilterdata={setFilterdata}
            />
          </div>
        </div>
      </div>
    );
}

export default Dashboard