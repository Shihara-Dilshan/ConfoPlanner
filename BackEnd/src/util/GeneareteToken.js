const jwt = require("jsonwebtoken");

const generateToken = (id, email, role) => {
  return jwt.sign(
    { _id: id, email: email, role: role },
    process.env.TOKENSCRET,
    { expiresIn: "24h" }
  );
};

module.exports = generateToken;
