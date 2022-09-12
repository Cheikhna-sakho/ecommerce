import React from 'react'
import Button from '../button/Button'
import InputFull from '../inputs/InputFull'
import { useState } from 'react';
import { Cat, Champ } from '../../model/model';
import { addCategory } from '../../api';
import { useNavigate } from 'react-router-dom';



const AddCategorieForm = () => {

  const Navigate = useNavigate();

  const [nameCat, setNameCat] = useState('');
  const [nameSubCat, setNameSubCat] = useState('');
  const [error, setError] = useState('');

  const cat = [
    new Champ('Nom de la catégorie', 'text', setNameCat, 'nameCat'),
    // new Champ('Nom de la sous catégorie', 'text', setNameSubCat, 'nameSubCat'),
  ]

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const categoriesData = {
      name: nameCat, 
    }

    console.log(nameCat);

    for(let data in categoriesData) {
      // console.log(categoriesData);
      if(categoriesData[data] == ""){
        setError('Ce champs est obligatoire');
      }
    }

    try {

      const res = await addCategory(categoriesData);
      console.log(res.data);
      Navigate("/dashboard");

    } catch (err) {
      console.log(err);
    }
}

return (

<div className="container">
<form onSubmit={(e) => handleSubmit(e)} className="w-full h-full max-w-lg m-auto">
  <fieldset><br/><br/>
    <p className="text-center text-gray-700 font-blod mb-2">Je crée une catégorie</p>
    <div className="flex flex-wrap -mx-3 mb-6">
    {cat.map((cat, i) => (

      <InputFull key={i} inputData={cat} />
      ))}
      {/* <label htmlFor="name-cat" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom de la catégorie</label> */}
    </div>

    <div className="flex flex-wrap -mx-3 mb-6">
      {/* <label htmlFor="name-subcat" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom de la sous catégorie</label> */}
      {/* <input type="text" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" /> */}
      <Button title={'Créer'} />
    </div>
  </fieldset>
</form>
</div>
)
}

export default AddCategorieForm;