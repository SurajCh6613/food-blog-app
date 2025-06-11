const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    instructions: {
      type: Array,
      required: true,
    },
    time: {
      type: String,
    },
    coverImage: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipes", recipeSchema);
