const Pizza = require("../models/pizza.model.js");

//Retreive all pizza from the database
exports.getallPizza = (req, res) => {
  Pizza.find()
    .then((pizza) => {
      res.send(pizza);
    })
    .catch((err) => {
      res.status(500).send({ Error: "Something Went Wrong" });
    });
};

//Add Pizza to database
exports.addPizza = (req, res) => {
  //validate Req
  if (!req.body.pizza_name || !req.body.ingredients || !req.body.size) {
    return res.status(400).send({ Error: "Please fill all required fields" });
  }
  const pizza = new Pizza({
    pizza_name: req.body.pizza_name,
    ingredients: req.body.ingredients,
    size: req.body.size,
  });
  //Save pizza in the database
  pizza
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        Error: "Something Went Worng",
      });
    });
};

//Find a pizza by ID
exports.getonePizza = (req, res) => {
  Pizza.findById(req.params.id)
    .then((pizza) => {
      // if (!pizza) {
      //   return res.status(404).send({
      //     Error: `Pizza Not found with id: ${req.params.id}`,
      //   });
      // }
      res.send(pizza);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          Error: `Pizza Not found with id: ${req.params.id}`,
        });
      }
      return res.status(500).send({
        Error: `Error getting the pizza with ID: ${req.params.id}`,
      });
    });
};

//Update Pizza by ID
exports.updatePizza = (req, res) => {
  if (!req.body.pizza_name || !req.body.ingredients || !req.body.size) {
    return res.status(400).send({ Error: "Please fill all required fields" });
  }
  //Find Pizza & update it with the request body
  Pizza.findByIdAndUpdate(
    req.params.id,
    {
      pizza_name: req.body.pizza_name,
      ingredients: req.body.ingredients,
      size: req.body.size,
    },
    { new: true }
  )
    .then((pizza) => {
      res.send(pizza);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          Error: `Pizza Not found with id: ${req.params.id}`,
        });
      }
      return res.status(500).send({
        Error: `Error updating the pizza with ID: ${req.params.id}`,
      });
    });
};

//Delete A pizza by ID
exports.deletePizza = (req, res) => {
  Pizza.findByIdAndRemove(req.params.id)
    .then((pizza) => {
      if (!pizza) {
        return res.status(404).send({
          Error: `Already Deleted Error finding the pizza with ID: ${req.params.id}`,
        });
      }
      res.status(404).send({
        Error: "Pizza Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          Error: `Error finding the pizza with ID: ${req.params.id}`,
        });
      }
      return res.status(500).send({
        Error: `Error! COuld not delete the pizza with ID: ${req.params.id}`,
      });
    });
};
