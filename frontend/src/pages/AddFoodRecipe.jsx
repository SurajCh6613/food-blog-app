import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddFoodRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;

    let val;

    if (name === "ingredients" || name === "instructions") {
      val = value?.split(",");
    } else if (name === "file") {
      val = files?.[0];
    } else {
      val = value;
    }

    setRecipeData((prev) => ({ ...prev, [name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"));
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="input"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Time</label>
            <input
              type="text"
              name="time"
              className="input"
              onChange={onHandleChange}
            />
          </div>
          <div className="form-control">
            <label>Ingredients</label>
            <textarea
              type="text"
              name="ingredients"
              className="input-textarea"
              rows="5"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label>Instructions</label>
            <textarea
              type="text"
              name="instructions"
              className="input-textarea"
              rows="5"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label>Recipe Image</label>
            <input
              type="file"
              className="input"
              name="file"
              onChange={onHandleChange}
            />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
};

export default AddFoodRecipe;
