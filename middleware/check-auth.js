const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.headers.token, "secret");
    req.userData = decodedToken;
    next();
  } catch (err) {
    res.status(400).send({ Error: "Authentication Failed" });
  }
};
