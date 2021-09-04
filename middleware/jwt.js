const usermodel = require("../model/user.model");
const { verifyToken } = require("../token/token");
const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.json({ message: "token not provided." }).status(401);
  }
  try {
    let decoded = await verifyToken(token);
    let user = await usermodel.findById(decoded.id, { token: 0, tokenExpiry: 0 }).lean();
    if (!user) {
      return res.clearCookie("auth_token").json({ message: "invalid token" }).status(401);
    }
    req.user = user;
    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError || err instanceof TokenExpiredError) {
      return res.clearCookie("auth_token").json({ message: "invalid token" }).status(401);
    }
    return next({ message: err.message, status: err.status });
  }
};
