const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");
const pizzaController = require("../controllers/pizza.controller.js");

//Getting all pizzas
router.get("/", pizzaController.getallPizza);

// Add new pizza
router.post("/addpizza", checkAuth, pizzaController.addPizza);

//Getting one pizza based upon ID
//Req:Pizza ID
router.get("/:id", pizzaController.getonePizza);

//Update Pizza
//Req:Pizza ID
router.put("/update/:id", checkAuth, pizzaController.updatePizza);

//Delete Pizza
//Req:Pizza ID
router.delete("/delete/:id", checkAuth, pizzaController.deletePizza);

module.exports = router;
