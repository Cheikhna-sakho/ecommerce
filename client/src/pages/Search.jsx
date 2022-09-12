import React,{useEffect, useState } from 'react'
import SearchCard from "../components/product/SearchCard";
import { getProducts } from "../api/index";
import { useParams } from "react-router-dom";

const Search = () => {
    let {search} = useParams();
    const [datas, setDatas] = useState([]);

    useEffect(() => {
      const getUser = async () => {
        try {
          const { data } = await getProducts();
          setDatas(data);
        } catch (error) {
          console.log("getUserConnectgetProducts", error);
        }
      };
      getUser();
    }, []);
    return (
      <div className="flex justify-around flex-wrap mb-6">
            {datas
                .filter((val) => {
                    return (
                      val.title.toLowerCase().includes(search.toLowerCase())
                    );
                })
                .map(({ id, title, description, image, price, stock, category }) => {
                    return (
                      <SearchCard
                        key={id}
                        id={id}
                        // id_user_id={id_user_id}
                        title={title}
                        description={description}
                        image={image}
                        price={price}
                        stock={stock}
                        category={category}
                      />
                    );
                })}
            </div>
  )
}

export default Search