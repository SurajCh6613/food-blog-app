const express = require("express");
const { userRegister, userLogin, getUser } = require("../controller/userController");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/user/:id",getUser);

module.exports = router;
