import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const RecipeItems = () => {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipe] = useState();
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  let path = window.location.pathname === "/myRecipes" ? true : false;
  let favItem = JSON.parse(localStorage.getItem("fav")) ?? [];
  // useEffect to re-render on deleting recipe
  useEffect(() => {
    setAllRecipe(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipe((recipes) => recipes.filter((recipe) => recipe._id !== id));
    let filterItem = favItem.filter((recipe) => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(filterItem));
  };

  const favRecipe = (item) => {
    let filterItem = favItem.filter((recipe) => recipe._id !== item._id);
    favItem =
      favItem.filter((recipe) => recipe._id === item._id).length === 0
        ? [...favItem, item]
        : filterItem;
    localStorage.setItem("fav", JSON.stringify(favItem));
    setIsFavRecipe((prev) => !prev);
  };

  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => (
        <div key={index} className="card hover:scale-105 duration-300">
          <img
            src={`http://localhost:3000/images/${item.coverImage}`}
            alt=""
            className="object-cover w-full h-50"
          />
          <div className="card-body">
            <div className="title">{item.title}</div>
            <div className="icons">
              <div className="timer">
                <BsStopwatchFill /> {item.time}
              </div>
              {!path ? (
                <FaHeart
                  onClick={() => favRecipe(item)}
                  style={{
                    color: favItem.some((res) => res._id === item._id)
                      ? "red"
                      : "",
                  }}
                />
              ) : (
                <div className="action">
                  <Link to={`/editRecipe/${item._id}`} className="editIcon">
                    <FaEdit />
                  </Link>
                  <MdDelete
                    onClick={() => onDelete(item._id)}
                    className="deleteIcon"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeItems;
