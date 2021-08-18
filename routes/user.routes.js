const express = require("express");
const checkAuth = require("../middleware/check-auth.js");
const router = express.Router();

const userController = require("../controllers/user.controller.js");

//Get all users
router.get("/allusers", checkAuth, userController.getallUsers);

// //User Registration
router.post("/newuser", userController.registerUser);
// //User Login
router.post("/login", userController.login);
// //update user
// router.put("/update", userController.updateUser);

// //delete user
router.delete("/delete/:id", checkAuth, userController.deleteUser);

module.exports = router;
