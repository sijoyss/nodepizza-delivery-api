const Order = require("../models/order.model.js");
const mongoose = require("mongoose");
//Retreive all order from the database
exports.getallOrders = (req, res) => {
  Order.find()
    .then((order) => {
      res.send(order);
    })
    .catch((err) => {
      res.status(500).send({
        Error: "Something went wrong",
      });
    });
};

exports.placeOrder = (req, res) => {
  //validate order
  if (!req.body.customer_name || !req.body.address || !req.body.phone) {
    return res.status(400).send({
      Error: "Please fill all required fields",
    });
  }
  const order = new Order({
    customer_name: req.body.customer_name,
    address: req.body.address,
    phone: req.body.phone,
    quantity: req.body.quantity,
    // pizzaId: req.params.pizzas,
  });
  console.log(order);
  //Save order to database
  order
    .save()
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        Error: "Something Went Worng",
      });
    });
};

exports.deleteOrder = (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (!order) {
        return res.status(404).send({
          Error: `Already Delete the order with ID: ${req.params.id}`,
        });
      }
      res.status(404).send({
        Error: "Order Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          Error: `Error finding the order with ID: ${req.params.id}`,
        });
      }
      return res.status(500).send({
        Error: `Error! Could not delete the order with ID: ${req.params.id}`,
      });
    });
};
