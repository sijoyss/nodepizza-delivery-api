const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const multer = require("multer");

const cors = require("cors");

const pizzaRoutes = require("./routes/pizza.routes.js");
const orderRoutes = require("./routes/order.routes.js");
const userRoutes = require("./routes/user.routes.js");
const fileRoutes = require("./routes/files.routes.js");
//Making express app
const app = express();
//Providing Port
const PORT = process.env.PORT || 8080;

//parse requests of content type-application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//content type:application/json
app.use(express.json());

//Multer to upload form data like images/files
// app.use(multer().single("image"));

//CORS not required for reference purpose
// app.use(cors({ origin: "*" }, { methods: "*" }));

//Config Database
const dbConfig = require("./config/database.config.js");
//Mongoose Dependency
const mongoose = require("mongoose");
//Connecting to db
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Could not connect to Database! Something wen Wrong!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Pizza Delivery API" });
});

app.use(morgan("tiny"));
//using as middleware
app.use("/pizza", pizzaRoutes);
app.use("/order", orderRoutes);
app.use("/user", userRoutes);
app.use("/uploads", fileRoutes);

app.listen(PORT, () => {
  console.log(`Server Running at PORT: http://localhost:${PORT}`);
});
