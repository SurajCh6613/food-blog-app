import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios, { all } from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get("http://localhost:3000/recipe").then((res) => {
    allRecipes = res.data;
  });
  return allRecipes;
};

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => item.createdBy === user._id);
};

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav"));
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getAllRecipes,
      },
      {
        path: "/myRecipes",
        element: <Home />,
        loader: getMyRecipes,
      },
      {
        path: "/favRecipes",
        element: <Home />,
        loader: getFavRecipes,
      },
      {
        path: "/addRecipe",
        element: <AddFoodRecipe />,
      },
      {
        path: "/editRecipe/:id",
        element: <EditRecipe />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
};

export default App;
