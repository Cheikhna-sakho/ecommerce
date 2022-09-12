import React, { useEffect } from 'react'
import { useState } from 'react';
import { adminAxios, getCategory, getCategoryId, getProductsId } from '../../api'
import Button from '../button/Button';
import { addArticle } from '../../api/index';
import InputFull from '../inputs/InputFull';
import { Champ, Select } from '../../model/model';
import SelectCategories from './SelectCategories';


const EditArticlesForm = ({onSubmited, AddImages}) => {

  // const [id_user_id, setId_user_id] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [caracteristic, setCaracteristic] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState('');
  const [images, setImages] = useState([]); // L'ensemble des image selectionné
  const [listImg, setListImg] = useState([]); // L'ensemble des nom des image
  const [sub_categories_id, setSubCategoriesId] = useState([]);
  const [error, setError] = useState('');
  

  function dragoverHandler(e){
    e.stopPropagation();
    e.preventDefault();
  }
  function dropHandler(e){
    e.stopPropagation();
    e.preventDefault();
    let dropImg = e.dataTransfer.files[0]; // L'image drop actuel

    const reader = new FileReader();

    const data = reader.readAsArrayBuffer(dropImg);

    reader.onload = (e) => {
      const data = e.target.result;
      setImages(images => [...images, dropImg]);
      setListImg(listImg =>[...listImg, dropImg.name]);
      console.log(images);
    }
    
  }
  const deleteImg = (e)=>{
    let selectImg = e.target;
    let explodeNameKey = selectImg.textContent.split('.')[0] - 1;
    // setImages(images.slice(explodeNameKey, 1))
    console.log(e.target.textContent, images, explodeNameKey, images.slice(explodeNameKey, 0));
  }
  const champs = [
    new Champ('Nom', 'text', setTitle, 'title'),
    new Champ("Description", "text", setDescription, 'description'),
    new Champ('Caracteristic', 'text', setCaracteristic, "caracteristique"),
    new Champ('Prix', "int", setPrice, "price"),
    new Champ("Stock", 'int', setStock, "stock"),
  ]

  // console.log(sub_categories_id);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formImg = new FormData();
    images.forEach(element => {
      formImg.append(element.name, element);
    });

    if(images.length == 0){
      console.log(images.length)
      formImg = false;
    }

    const articlesData = {
      title,
      description,
      caracteristic,
      price: parseInt(price),
      stock: parseInt(stock),
      sub_categories_id
    }

    for (let data in articlesData) {
      if (articlesData[data] == "") {
        setError('Ce champs est obligatoire');
      }
    }
    try {
      onSubmited(articlesData, formImg);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <div className="container">
        <p className="text-center text-gray-700 font-blod mb-2">Je crée un article</p>
        <form onSubmit={(e) => handleSubmit(e)} className="w-full h-full max-w-lg m-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            {champs.map((champs, i) => (
              <InputFull key={i} inputData={champs} />
            ))}

            <SelectCategories setData={setSubCategoriesId}/>
           
           <div id="drop-area"style={{border: "1px solid blue", padding: "15px", marginTop:"5px"}} onDragOver={dragoverHandler} onDrop={dropHandler}>
                Drop one file here
            </div>
           <div className='listImg'>

              {listImg.map((name, i )=>{
                return <span key={i} onClick={deleteImg}>{i + 1}. {name}<br /></span>
              })}
              <Button title={'Créer'} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditArticlesForm