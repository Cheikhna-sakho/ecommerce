import axios from "axios";

const API = axios.create({
  // baseURL:"https://127.0.0.1:8000",
  baseURL: process.env.REACT_APP_API_URL,
  
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const storage = JSON.parse(localStorage.getItem("token"));
  if (storage) req.headers.Authorization = `Bearer ${storage.token}`;
  return req;
});

// user

export const loginAxios = (formData) => API.post("/api/login_check", formData);
export const registerAxios = (formData) => API.post("/api/register", formData);
export const adminAxios = (formData) => API.post("/api/admin", formData);
export const addArticle = (formData) => API.post("/api/articles/", formData);
export const addImages = (formData, id) => {
  if (formData) {
    // Appelé seulement si formData != false
    API.post(`/api/images/add/${id}`, formData);
  }
};

export const getUserConnect = () => API.get("/api/connect");
// export const updateUser = (formData) => API.post("/user/profile", formData);


// products
export const getProducts = () => API.get("/api/articles");
export const getProductsId = (id) => API.get(`/api/articles/${id}`);
export const updateProducts = (id, formData) => API.patch(`/articles/${id}`, formData);
export const deleteProducts = (id) => API.delete(`/api/articles/${id}`);
export const updateStock = (id) => API.patch(`/api/articles/stock/${id}`);

//Categorie
export const addCategory = (formData) => API.post("/api/categories/", formData);
export const getCategory = () => API.get("/api/categories");
export const getCategoryId = (id) => API.get("/api/categories/" + id);
export const getRates = (formData) => API.post("/api/articles/rates", formData);



//Commentaires

export const addComments = (formData, id) => API.post("api/comments/" + id, formData);
export const getComments = () => API.get("api/comments");

