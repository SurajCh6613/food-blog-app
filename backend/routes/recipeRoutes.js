const express = require("express");
const {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
} = require("../controller/recipeController");
const verifyToken = require("../middleware/auth");
const router = express.Router();

router.get("/", getRecipes); // Get all recipes
router.get("/:id", getRecipe); // Get recipe by id
router.post("/", upload.single("file"), verifyToken, addRecipe); //Add Recipe
router.put("/:id", editRecipe); // Edit Recipe
router.delete("/:id", deleteRecipe); // Delete Recipe

module.exports = router;
