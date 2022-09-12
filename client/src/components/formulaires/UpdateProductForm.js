import React, { useEffect } from 'react';
import Button from '../button/Button';
import InputFull from '../inputs/InputFull';
import {Champ,Select} from '../../model/model';
import {useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsId, updateProducts } from '../../api';


const UpdateProductForm = () => {
  
  const Navigate = useNavigate();
  let { id } = useParams();
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [caracteristic, setCaracteristic] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState("");
  const [error, setError] = useState("");

const getData = async () => {
  try {
    const res = await getProductsId(id);
    setData(res.data);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getData();
}, []);

  const champs = [
    new Champ("Nom", "text", setTitle, "title", title || data.title),
    new Champ(
      "Description",
      "text",
      setDescription,
      "description",
      description || data.description
    ),
    new Champ(
      "Caracteristic",
      "text",
      setCaracteristic,
      "caracteristique",
      caracteristic || data.caracteristic
    ),
    new Champ("Prix", "int", setPrice, "price", price || data.price),
    new Champ("Stock", "int", setStock, "stock", stock || data.stock),
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const articlesData = {
      title,
      description,
      caracteristic,
      price: parseInt(price),
      stock: parseInt(stock),
    };

    console.log(articlesData);
    for (let data in articlesData) {
      if (articlesData[data] == "") {
        setError("Ce champs est obligatoire");
      }
    }
    try {
      const res = await updateProducts(id, articlesData);
      console.log(res.data);
      Navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <p className="text-center text-gray-700 font-blod mb-2">
        Je modifie cet article
      </p>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full h-full max-w-lg m-auto"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          {champs.map((champs, i) => (
            <InputFull key={i} inputData={champs} />
          ))}

          <Button title={"Modifier"} />
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
