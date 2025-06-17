import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:3000/recipe/${id}`).then((response) => {
        let res = response.data;
        setRecipeData({
          title: res.title,
          time: res.time,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions.join(","),
        });
      });
    };
    getData();
  }, []);

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
      .put(`http://localhost:3000/recipe/${id}`, recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/myRecipes"));
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
              value={recipeData.title}
            />
          </div>
          <div className="form-control">
            <label>Time</label>
            <input
              type="text"
              name="time"
              className="input"
              onChange={onHandleChange}
              value={recipeData.time}
            />
          </div>
          <div className="form-control">
            <label>Ingredients</label>
            <textarea
              type="text"
              name="ingredients"
              className="input-textarea"
              rows="5"
              value={recipeData.ingredients}
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
              value={recipeData.instructions}
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
          <button type="submit">Edit Recipe</button>
        </form>
      </div>
    </>
  );
};

export default EditRecipe;
