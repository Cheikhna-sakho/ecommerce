import React from 'react';
import Product from '../components/product/Product';
import Popularity from '../components/product/ProductsPopularity';
import Footer from '../components/Footer';

export const Home = () => {
    return (
      <>
        <Product />
        <Popularity />
      </>
    );
}

export default Home;