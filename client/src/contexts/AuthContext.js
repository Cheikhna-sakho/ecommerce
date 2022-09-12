import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserConnect, getProducts, getCategory } from "../api/index";

const AuthContext = createContext(null);
export const UserAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userGuest, setUserGuest] = useState(null);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [port, setPort] = useState(0.0);
  const [totalCommande, setTotalCommande] = useState(0);
  const [shipping, setShipping] = useState(null);
  const [articles, setArticles] = useState([]);
  const [order,setOrder] = useState(null)

  useEffect(() => {
    const localStorageToken = JSON.parse(localStorage.getItem("token"));
    const localStorageUserGuest = JSON.parse(localStorage.getItem("userGuest"));
    const localStorageBasket = JSON.parse(localStorage.getItem("panier"));

    if (localStorageToken) setToken(localStorageToken);
    if (localStorageBasket) setBasket(localStorageBasket);
    if(localStorageUserGuest) setUserGuest(localStorageUserGuest);

    (async () => {
      try {
        const res = await getProducts();
        setArticles(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
    
  }, []);

  useEffect(() => {
    if (token) {
      ( async () => {
        try {
          const { data } = await getUserConnect();
          setUser(data);
        } catch (error) {
          if (error.response.data.message === "Expired JWT Token") {
            localStorage.removeItem("users");
            setUser(null);
          }
        }
      })();

      localStorage.setItem("token", token && JSON.stringify(token));
    }


  }, [token]);


  useEffect(() => {
    if (basket.length > 1) localStorage.setItem("panier", basket && JSON.stringify(basket))
  }, [basket]);
  
  useEffect(() => {
     if (totalCommande > 5000) {
       setPort(0.0);
     }
     setTotalCommande(basket.reduce((a, c) => a + c.qty * c.price, 0));
     setTotal(totalCommande + port);
   }, [basket, totalCommande, total, port]);



  useEffect(() => {
    if (user) {
      if (JSON.parse(localStorage.getItem("userGuest")))localStorage.removeItem("userGuest");
      
      const { firstname, lastname, adresse, city, zipcode, phone } = user;
      
      const newShip = {
        firstname,
        lastname,
        address: adresse,
        apartment: "",
        city,
        zipcode,
        country: "US",
        phone,
      };
      
      setShipping({ ...newShip });
    }

    //   console.log("values", values);
  }, [user]);
  // console.log(articles)

  const statedData = {
    contextToken: [token, setToken],
    contextUser: [user, setUser],
    contextUserGuest: [userGuest, setUserGuest],
    contextBasket: [basket, setBasket],
    contextTotalCommande: [totalCommande, setTotalCommande],
    contextTotal: [total, setTotal],
    contextPort: [port, setPort],
    contextArticles: [articles, setArticles],
    contextShipping: [shipping, setShipping],
    contextOrder:[order,setOrder]
  };

  return (
    <AuthContext.Provider value={statedData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
