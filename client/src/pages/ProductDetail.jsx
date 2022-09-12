import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Photo from "../assets/produit.jpg";
import Detail from "../assets/details.jpg";
import Carousel from "react-grid-carousel";
import { addComments, getComments, getProductsId } from "../api";
import ButtonAddBasket from "../components/button/ButtonAddBasket";
import SvgEtoile from "../components/product/SvgEtoile";
import ButtonComment from "../components/button/ButtonComment";

const ProductDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");


  const addComment = async () => {
    try {
      const res = await addComments({comment}, id);
      alert('Merci pour votre commentaire !');
      window.location.reload();
    } catch (error) {
      setError('Vous devez avoir un compte pour poster un commentaire. Veuillez vous connecter ou vous inscrire.');    
      console.log(error);
    }
  }

  const getComment = async (id) => {
    try
    {
      const res = await getComments(id);
      setComments(res.data);
      // console.log("get comment", res.data);
    }
    catch (error) 
    {
      console.log(error);
    }
  }

  useEffect(() => {
    getComment();
  }, []);

  console.log(error);
  const getData = async () => {
    try {
      const res = await getProductsId(id);
      setData(res.data);
    } catch (error) {
      setData({status : error.response.data.status});
    }
  };

  useEffect(() => {
    getData();
  }, []);

// console.log(comment);
  return Object.keys(data).length === 0 || data?.status === 404 ? (
    <section className="flex flex-col justify-center items-center h-[80vh] text-3xl">
      <p className="my-2">DÉSOLÉ cette page n’existe pas (plus).</p>
      <Link to="/">
        Reformulez votre recherche ou allez sur la page d’accueil d’Amazon.
      </Link>
    </section>
  ) : (
    <section className="flex flex-col lg:flex-row justify-center items-center">
      {data?.images && data?.images.length === 0 && (
        <Carousel cols={1} rows={1} gap={1}>
          <Carousel.Item>
            <img style={{ margin: "auto" }} width="90%" src={Detail} />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ margin: "auto" }} width="90%" src={Photo} />
          </Carousel.Item>
          <Carousel.Item>
            <img style={{ margin: "auto" }} width="90%" src={Detail} />
          </Carousel.Item>
        </Carousel>
      )}

      {data?.images && data?.images.length > 0 && (
        <Carousel cols={1} rows={1} gap={1}>
          {data?.images.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img
                style={{ margin: "auto" }}
                width="90%"
                src={process.env.REACT_APP_API_URL + item.src}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )}

      <div className="details-product">
        <p className="details-title">{data.title}</p>
        <br />
        <p className="details-description">Description : {data.description}</p>
        <br />
        <p className="details-caracteristic">
          Caracteristiques : {data.caracteristic}
        </p>
        <br />
        <p className="text-green-600 font-bold text-lg²">En stock</p>
        <SvgEtoile />
        {data.stock > 0 ? (
          <ButtonAddBasket produit={data} />
        ) : (
          <p className="text-red-700 text-lg font-bold">Rupture stock</p>
        )}
      </div>

      <p className="text-center" style={{ color: "red" }}>
        {error}
      </p>
      <div class="container comment form-group">
        <p class="text-muted commentLabel">
          Laissez un commentaire pour cet article !
        </p>
        <textarea
          onChange={(e) => setComment(e.target.value)}
          class="textarea form-control"
          id="exampleTextarea"
          rows="3"
        ></textarea>
        <ButtonComment onClicked={addComment} title="Commenter" />
        <br />

        {comments.map((comment, i) => (
          <div class="container card mb-4">
            <div class="card-body">
              <h6 class="card-title mb-4">{comment.comment}</h6>
              <p class="card-subtitle">
                Posté par {comment.user?.firstname} {comment.user?.lastname} le{" "}
                {comment.created_at}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



export default ProductDetail;
