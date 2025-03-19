const express = require("express");
const router = express.Router();

const {register, login, checkUser
} = require("../Controller/userController");
const authMiddleware = require("../Middleware/AuthMiddleware");


// register route
router.post('/register', register)

// login route
router.post('/login', login)

// Check user route
router.get("/checkUser", authMiddleware, checkUser);

module.exports = router;