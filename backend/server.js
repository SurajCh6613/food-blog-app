require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const recipe = require("./routes/recipe");
const cors = require('cors')
const connectDB = require("./config/connectionDB");
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(cors())

app.use("/recipe", recipe);

app.listen(PORT, () => {
  console.log(`Server running at PORT : ${PORT}`);
});
