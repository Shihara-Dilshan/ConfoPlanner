const jwt = require("jsonwebtoken");

const generateToken = (id, email, role, profilePic, mobile) => {
  return jwt.sign(
    { _id: id, email: email, role: role, profilePicture: profilePic, mobile: mobile },
    process.env.TOKENSCRET,
    { expiresIn: "24h" }
  );
};

module.exports = generateToken;
  