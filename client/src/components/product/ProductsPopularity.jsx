import React from 'react'
import Carousel from 'react-grid-carousel';
import { Link } from "react-router-dom";
import  {UserAuth}  from '../../contexts/AuthContext';
import Photo from '../../assets/produit.jpg'
import ButtonPopularity from '../button/ButtonPopularity';

const ProductsPopularity = ({ article }) => {
  
  const {contextArticles} = UserAuth();
  const [articles] = contextArticles;

  return (

<div className='my-2'>
  <h1 className="text-center text-6xl py-7">Nos 
    <span className="font-bold">Topventes</span>
  </h1>
 
  <Carousel cols={3} rows={1} gap={1} loop>
    {articles.filter(article => article.popularity > 600).map((item, i) => (
    <Carousel.Item key={i}>
      <Link to={`/product/${item.id}`}>
        <img alt="article" className="imgPopularity" style={{margin: 'auto'}} width={item.width} src={item.images.length > 0
      ? process.env.REACT_APP_API_URL+item.images[0].src
      : Photo} />
      </Link><br/>
      <div className="descriptionPopularity">{item.description}</div>
      <p className="prixPopularity">{item.price} €</p>
    </Carousel.Item>
      ))}
  </Carousel>
   <div className="text-center">
  <ButtonPopularity title="Voir toutes nos meilleures ventes"/>
</div>
</div>  

  )
}

export default ProductsPopularity;
