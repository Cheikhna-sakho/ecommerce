import React from 'react'
import EditArticlesForm from '../components/formulaires/EditArticlesForm'
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../api';
import { addImages } from '../api';


const AddArticle = () => {
  
  const Navigate = useNavigate();


  const succesAddArticle = async (articlesData, formImg) => {
    const res = await addArticle(articlesData); 
    const res2 = await addImages(formImg, res.data.id);
    alert('Votre article a été ajouté');
    Navigate('/');
  }

  return ( 
      
    <EditArticlesForm onSubmited ={succesAddArticle}/>
    
  )
}

export default AddArticle;