const Recipes = require("../models/recipe");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

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

/// Add Recipe
const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Required fields can't be empty",
      });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file?.filename || "", // optional chaining,
      createdBy: req.user.id,
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Add Recipe Error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Edit Recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  const { id } = req.params;
  let recipe = await Recipes.findById(id);
  try {
    if (recipe) {
      let coverImage = req.file?.filename
        ? req.file?.filename
        : recipe.coverImage;
      await Recipes.findByIdAndUpdate(
        id,
        { ...req.body, coverImage },
        { new: true }
      );
      return res.json({ title, ingredients, instructions, time });
    }
  } catch (error) {
    return res.status(404).json({ message: "Recipe not found" });
  }
};

const deleteRecipe = async (req, res) => {
 try {
   await Recipes.deleteOne({_id:req.params.id})
   res.json({message:"Recipe Deleted"})
 } catch (error) {
  return res.status(400).json({message:"Delete Error"})
 }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
