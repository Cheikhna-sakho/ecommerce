import React from "react";
import { Link } from "react-router-dom";
import Photo from '../../assets/produit.jpg';
import ButtonAddBasket from "../button/ButtonAddBasket";
import SvgEtoile from "./SvgEtoile";

const Card = ({ article }) => {
  
  const srcImg =

    article.images.length > 0
      ? process.env.REACT_APP_API_URL+article.images[0].src
      : Photo;
  
      const limitStock = () => {
        let classNamesColor = "";
        const other_color = [
          {
            id: 8,
            color: "text-yellow-200"
          },
          {
            id: 9,
            color: "text-yellow-300"
          },
          {
            id: 10,
            color: "text-yellow-500"
          }
        ];
        
        if (article?.stock <= 10) {
          if (article?.stock <= 7) {
            classNamesColor = `text-red-${1000 - (article?.stock * 100)}`
          } else {
            const {color} = other_color.find(col => col.id == article?.stock);
            classNamesColor = color;
          }
          return <p className={`${classNamesColor} text-sm font-bold`}> plus de {article?.stock} article</p>
        }
      }

  return (
    
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:border-gray-700">
      <Link to={`/product/${article.id}`}>
        <img className="p-8 rounded-t-lg" src={srcImg} alt="product image" />
      </Link>
      <div className="px-5 pb-5">
        <h3 className="text-xl font-semibold tracking-tight my-4">
          {article.title}
        </h3>
        <p className="text-muted fake-white">{article.description}</p>
            <SvgEtoile/>
        {limitStock()}
        <div className="flex justify-between items-center">
          <p>
            <span className="text-3xl font-bold text-gray-900">
              {article.price} €
            </span>
          </p>
          {article.stock > 0 ? (
            <ButtonAddBasket produit={article} />
          ) : (
            <p className="text-red-700 text-lg font-bold">Rupture stock</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card