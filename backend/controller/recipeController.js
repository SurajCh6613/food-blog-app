const getRecipes = (req, res) => {
  res.json({ message: "All Recipes" });
};

const getRecipe = (req, res) => {
  res.json({ message: "Recipe found" });
};

const addRecipe = (req, res) => {
  res.json({ message: "Recipe Add" });
};

const editRecipe = (req, res) => {
  res.json({ message: "Edit Recipe" });
};

const deleteRecipe = (req, res) => {
  res.json({
    message: "Recipe Deleted",
  });
};

module.exports = { getRecipes ,getRecipe,addRecipe,editRecipe,deleteRecipe};
