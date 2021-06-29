const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign(
    { _id: id, role: role },
    process.env.TOKENSCRET,
    { expiresIn: "24h" }
  );
};

module.exports = generateToken;
  