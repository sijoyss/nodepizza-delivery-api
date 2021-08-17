const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller.js");

//Getting all orders with User NAME & PIZZA NAME
router.get("/", orderController.getallOrders);

//Create order combining pizza name and customer name
router.post("/placeorder", orderController.placeOrder);

//Delete order by order ID
//Req:ID
router.delete("/delete/:id", orderController.deleteOrder);

module.exports = router;
