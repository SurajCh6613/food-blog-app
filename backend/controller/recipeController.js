const Recipes = require("../models/recipe");

// Get All Recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  if (!recipes) {
    return res.json({ message: "No Recipes found" });
  }
  return res.json(recipes);
};

// Get Single Recipe
const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  if (!recipe) {
    return res.json({ message: "Recipe Not found" });
  }
  return res.json(recipe);
};

// Add Recipe
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  if (!title || !ingredients || !instructions) {
    return res.json({
      message: "Required fields can't be empty",
    });
  }
  const newRecipe = await Recipes.create({
    title,
    ingredients,
    instructions,
    time,
  });
  return res.json(newRecipe);
};

// Edit Recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  const recipe = await Recipes.findById(req.params.id);
  if (!recipe) {
    return res.json({ message: "Recipe not found" });
  }
  try {
    await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ title, ingredients, instructions, time });
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipes.deleteOne({ _id: recipe._id }); // <-- fix here
    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
