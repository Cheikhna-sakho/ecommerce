import React from 'react';
import { useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

const SearchBar = ({text}) => {

    const Navigate = useNavigate();

    const handleSearchTerm = (e) => {
      let value = e.target.value;
      if (value.length >= 1) Navigate(`/search/${value}`);
    };

  return (
    <div className={`${text}`}>
      <div className="flex justify-around border-2 rounded w-full">
        <input
          type="text"
          className="px-4 py-2 w-4/5"
          placeholder="Rechercher ..." 
          onChange={handleSearchTerm}
        />
        <button className="flex items-center justify-center px-4 border-l">
          <RiSearchLine className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar