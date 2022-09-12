import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import { deleteProducts, updateStock } from "../../api";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const ProductItem = (
  {
  id,
  title,
  description,
  price,
  stock,
  sub_categories

}

  ) => {
    // console.log("stock", stock);

  const [newStock, setNewStock] = useState(0);

  const Navigate = useNavigate();

  const deleteProduct = async (id) => {

    try {
      const res = await deleteProducts(id);
      Navigate("/dashboard");
      alert("Votre article a bien été supprimé");
      Navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  // const inputRef = useRef();

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log();

  }

  const handleChange = (e) => {
    setNewStock(e.target.value)
    console.log(e.target.value);

  }

  const getStock = async () => {
    try{
      const res = await updateStock(id);

      setNewStock(res.data);
      
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    getStock();
  }, []);




  return (
    <>
      <tr
        className="border-b border-gray-500"
      >
        <td className="px-6 py-4 whitespace-no-wrap">
          <div className="flex items-center">
            <div>
              <div className="text-sm leading-5 text-gray-800">#{id} </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-no-wrap ">
          <div className="fake-white text-sm leading-5 text-blue-900">
            {title}
          </div>
        </td>
        <td className="fake-white">
          {description}
        </td>
        

        <td className="px-6 py-4 whitespace-no-wrap  text-blue-900 text-sm leading-5">
          {price}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap  text-blue-900 text-sm leading-5">
          {sub_categories.map((sub_categorie) => 
            <p key={id}>{sub_categorie.name}</p>
          )}
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-blue-900 text-sm leading-5 z-0">
          <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
            ></span>
            <span className="relative text-xs">{stock}</span>
          </span>
        </td>
        <td className="text-center px-6 py-4 whitespace-no-wrap ">
          <div className="fake-white text-sm leading-5 text-blue-900">
            <form acton="submit" onSubmit={handleSubmit}>
            <input value={newStock} onChange={handleChange} type="number" />
            <button>Ajouter +</button>
            </form>
          </div>
        </td>
        
       
       
        <td className="flex gap-2 px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 ">
          <Link
            to={`/product/${id}`}
            className="text-gray-100 text-lg font-medium rounded-md bg-blue-600 no-underline
            p-2"
          >
            {" "}
            Voir
          </Link>
          <Link
            to={`/articles/edit/${id}`}
            className="text-gray-100 text-lg font-medium rounded-md bg-yellow-600 p-2 no-underline"
          >
            Modifier
          </Link>
          <button
            onClick={() => deleteProduct(id)}
            className="text-gray-100 text-lg font-medium rounded-md bg-red-600 p-2"
          >
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
};

export default ProductItem