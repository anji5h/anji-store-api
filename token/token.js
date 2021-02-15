const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

const verifyToken = async function (token) {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

const createToken = async function (payload) {
  return promisify(jwt.sign)(payload, process.env.JWT_SECRET);
};

module.exports = {
  verifyToken,
  createToken,
};
