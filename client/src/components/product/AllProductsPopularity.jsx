import React from 'react'
import { UserAuth } from '../../contexts/AuthContext';
import Card from './Card';

const AllProductsPopularity = () => {

  const {contextArticles} = UserAuth();
  const [articles] = contextArticles;  

  return (
    <>
    <br/><br/><br/><br/>

    <h1 className="text-center text-6xl">
      Nos
      <span className="font-bold"> Meilleure ventes</span>
    </h1>

      <div className="max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4">
        {articles.filter(article => article.popularity > 400).map((item, i) => (
          <Card key={item.id} article={item} />
        ))}
      </div>
          
     </>
  );
  
};

export default AllProductsPopularity