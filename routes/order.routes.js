const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth.js");

const orderController = require("../controllers/order.controller.js");

//Getting all orders with User NAME & PIZZA NAME
router.get("/", checkAuth, orderController.getallOrders);

//Create order combining pizza name and customer name
router.post("/placeorder", checkAuth, orderController.placeOrder);

//Delete order by order ID
//Req:ID
router.delete("/delete/:id", checkAuth, orderController.deleteOrder);

module.exports = router;
