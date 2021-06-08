const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  return jwt.sign(
    { _id: id, email: email },
    process.env.TOKENSCRET,
    { expiresIn: "24h" }
  );
};

module.exports = generateToken;
