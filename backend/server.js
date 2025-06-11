require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const recipe = require("./routes/recipe");
const connectDB = require("./config/connectionDB");
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.use("/recipe", recipe);

app.listen(PORT, () => {
  console.log(`Server running at PORT : ${PORT}`);
});
