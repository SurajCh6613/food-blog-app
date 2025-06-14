require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const recipeRoutes = require("./routes/recipeRoutes");
const cors = require('cors')
const connectDB = require("./config/connectionDB");
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.static("public"))
app.use(cors())

app.use("/",require("./routes/userRoutes"))
app.use("/recipe", require('./routes/recipeRoutes'));

app.listen(PORT, () => {
  console.log(`Server running at PORT : ${PORT}`);
});
