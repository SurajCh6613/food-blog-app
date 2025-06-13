import React from "react";
import foodRecipe from "../assets/foodRecipe.png";
import RecipeItems from "../components/RecipeItems";
const Home = () => {
  return (
    <>
      <section className="home">
        <div className="left">
          <h1 className="">Food Recipe</h1>
          <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            accusamus quos et voluptas repellat maiores voluptatem optio facere
            tempora voluptatibus!
          </h5>
          <button>Share your Recipe</button>
        </div>
        <div className="right">
          <img src={foodRecipe} alt="foodRecipe" width="320px" height="300px" />
        </div>
      </section>
      <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,64L60,96C120,128,240,192,360,208C480,224,600,192,720,160C840,128,960,96,1080,96C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="recipe">
        <RecipeItems />
      </div>
    </>
  );
};

export default Home;
