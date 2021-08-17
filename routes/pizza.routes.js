const express = require("express");

const router = express.Router();

const pizzaController = require("../controllers/pizza.controller.js");

//Getting all pizzas
router.get("/", pizzaController.getallPizza);

// Add new pizza
router.post("/addpizza", pizzaController.addPizza);

//Getting one pizza based upon ID
//Req:Pizza ID
router.get("/:id", pizzaController.getonePizza);

//Update Pizza
//Req:Pizza ID
router.put("/update/:id", pizzaController.updatePizza);

//Delete Pizza
//Req:Pizza ID
router.delete("/delete/:id", pizzaController.deletePizza);

module.exports = router;
