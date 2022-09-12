import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Notfound from "../pages/Notfound";
import ProductDetail from "../pages/ProductDetail";
import AddArticle from "../pages/AddArticle";
import EditProduct from "../pages/EditProduct";
import UpdateProductForm from "../components/formulaires/UpdateProductForm";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/Search";
import Basket from "../pages/Basket";
import Layout from "../components/Layout";
import Unauthorized from "../components/protected/Unauthorized";
import RequireAuth from "../components/protected/RequireAuth";
import Authentication from "../components/protected/Authentication";
import AddCategorieFrom from "../components/formulaires/AddCategorieForm";
import Categories from "../pages/Categories";
import AllProductsPopularity from "../components/product/AllProductsPopularity";
import Checkout from "../pages/Checkout";
import Identity from "../components/checkout/Identity";
import RequireIdentity from "../components/protected/RequireIdentity";
import Commande from "../pages/Commande";


const ROLES = {
  user: "ROLE_USER",
  editor: "ROLE_EDITOR",
  admin: "ROLE_ADMIN",
};


const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<AddCategorieFrom />} />
        <Route path="/categories/:id" element={<Categories />} />
        <Route path="/allPopularity" element={<AllProductsPopularity />} />

        {/* Admin panel routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
          <Route path="/articles/edit/:id" element={<UpdateProductForm />} />
          <Route path="/articles/update/:id" element={<EditProduct />} />
          <Route path="/articles/add" element={<AddArticle />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/commande" element={<Commande />} />
        </Route>

        <Route path="identity" element={<Identity />} />

        <Route element={<RequireIdentity />}>
          <Route path="checkout" element={<Checkout />} />
        </Route>

        <Route element={<Authentication />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Notfound />} />
      </Route>
    </Routes>
  );
};

export default Router;
