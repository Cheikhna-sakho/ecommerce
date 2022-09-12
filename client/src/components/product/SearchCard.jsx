import React from 'react'
import { Link } from 'react-router-dom'

const SearchCard = ({
  id,
  title,
  description,
  image,
  price,
  stock,
  category,
}) => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md dark:border-gray-700">
      <Link to={`/product/${id}`}>
        <div className="px-5 pb-5">
          <h3 className="text-xl font-semibold tracking-tight my-4">{title}</h3>

          <p className="text-muted fake-white">{description}</p>

          <div className="flex justify-between items-center">
            <span className="text-3xl font-bold text-gray-900">{price}€</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchCard;