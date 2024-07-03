// src/components/Router.jsx

import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "../main/Users";
import Products from "../main/Products";
import Category from "../main/Category";
import Brand from "../main/Brands";
import Admin from "../main/Admin";
import Login from "../auth/Login";
import Register from "../auth/Register";

import { authStore } from "../store/auth.store";
import Description from "../main/description";

export function Router() {
  let role = localStorage.getItem("role");
  let access_token = localStorage.getItem("accessToken");
  useEffect(() => {
    authStore.checkAuthentication();
  }, []);

  return (
    <>
      <Routes>
        {role === "admin" && access_token ? (
          <>
            <Route path="/desctiption/:id" element={<Description />} />
            <Route path="/" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : authStore.isAuth === false ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : null}
      </Routes>
    </>
  );
}
