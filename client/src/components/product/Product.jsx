import React, { useEffect, useState } from "react";
import Card from "./Card";
import Pagination from "../Pagination";
import { UserAuth } from "../../contexts/AuthContext";

const Product = () => {
  const { contextArticles } = UserAuth();
  const [articles] = contextArticles;
  const [filterdata, setFilterdata] = useState([]);
  const ratio = 10;
  const [first, setFirst] = useState(0);
  const [end, setEnd] = useState(ratio);

  useEffect(() => {
    if (articles.length === 0) setFilterdata(articles.slice(0, 10))
    else {
      setFilterdata(articles.slice(first, end));
      }
  }, [first, end, articles]);

  return (
    <>
    <br/><br/><br/><br/>
      <h1 className="text-center text-6xl">
        Nos
        <span className="font-bold"> Articles</span>
      </h1>

      <div className="max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4">
        {filterdata.map((article) => (
          <Card key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        data={articles}
        ratio={ratio}
        first={first}
        setFirst={setFirst}
        end={end}
        setEnd={setEnd}
        filterdata={filterdata}
        setFilterdata={setFilterdata}
      />
    </>
  );
};

export default Product;
