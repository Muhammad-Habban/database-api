const express = require("express")
const router = express.Router();
const {createNewUser, loginUser, getUsers} = require("../controllers/authController");

router.post("/register", createNewUser);
router.post("/login", loginUser).get("/users", getUsers);

module.exports = router;