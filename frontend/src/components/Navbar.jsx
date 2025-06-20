import React from "react";
import { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);

  let user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <header>
        <h2 className="text-2xl font-bold cursor-pointer text-blue-500">
          Food Blog
        </h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => isLogin && setIsOpen(true)}
              to={!isLogin ? "/myRecipes" : "/"}
            >
              My Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => isLogin && setIsOpen(true)}
              to={!isLogin ? "/favRecipes" : "/"}
            >
              Favourites
            </NavLink>
          </li>
          <li onClick={checkLogin}>{isLogin ? "Login" : `Logout (${user.name})`}</li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
