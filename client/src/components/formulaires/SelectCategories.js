import React, { useEffect, useState } from 'react'
import { getCategory, getCategoryId } from '../../api';

const SelectCategories = ({ setData }) => {

  const [checked, setChecked] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    // console.log(updatedList);
    setData(updatedList);
    setChecked(updatedList);
  };

  const getSubCategory = async (id) => {
    const res = await getCategoryId(id);
    console.log(res.data.subCategories);
    setSubCategories(res.data.subCategories);
  }

  const GetCategories = async () => {
    try {
      const res = await getCategory();
      const categories = res.data
      setCategories(categories);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetCategories();
  }, []);

  return (

<div className="container" >
  <select className="select" onChange={(e) => getSubCategory(e.target.value)}>
    <option disabled selected>Selectionnez une catégorie </option>
    {categories.map((category, i) => (
    <option key={i} value={category.id}> {category.name}</option>
    ))}
  </select>
  <div className="checkbox">
  {subCategories.map((subCategory, i) => (
  <fieldset class="">
    <div class="check">
    <label class="sub-label" htmlFor="subCategory">{subCategory.name}</label>
      <input onChange={handleCheck} value={subCategory.id} type="checkbox" id="flexCheckDefault" />
    </div>
  </fieldset>
  ))}
</div><br/>
  </div>
  )
}

export default SelectCategories