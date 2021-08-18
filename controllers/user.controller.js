const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Retrieve all users
exports.getallUsers = (req, res) => {
  User.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ Error: "Something went wrong" });
    });
};

exports.registerUser = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;
  if (!username || !email || !phone || !address || !password) {
    return res.status(400).send({
      Error: "Please fill all required fields",
    });
  }
  User.exists({
    phone: req.body.phone,
  })
    .then((user) => {
      if (user) {
        res.status(400).send({
          Error: `User already exists  with phone : ${phone}`,
        });
      } else {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const user = new User({
            username: username,
            email: email,
            phone: phone,
            address: address,
            password: hashedPassword,
          });
          user.save().then((user) => {
            res.send(user);
            console.log(user);
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        Error: "Something Went worng",
      });
    });
};

exports.login = (req, res) => {
  const phone = req.body.phone;
  const password = req.body.password;
  if (!phone || !password) {
    return res.status(400).send({
      Error: "Please fill all required fields",
    });
  }
  User.findOne({ phone: req.body.phone }).then((user) => {
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((data) => {
          if (data) {
            const accesstoken = jwt.sign({ user: user }, "secret", {
              expiresIn: "1h",
            });
            console.log(accesstoken);
            res
              .status(200)
              .send({ Message: "Logged In", accesstoken: accesstoken });
          } else {
            return res.status(400).send({ Message: "Password Dont Match" });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      res.status(400).send({
        Error: "Wrong Phone Number/ No user existing with given phone number",
      });
    }
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          Error: `Already Delete the user with ID: ${req.params.id}`,
        });
      }
      res.status(404).send({
        Error: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          Error: `Error finding the user with ID: ${req.params.id}`,
        });
      }
      return res.status(500).send({
        Error: `Error! Could not delete the user with ID: ${req.params.id}`,
      });
    });
};
