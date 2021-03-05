module.exports = function (req, res, next) {
  if (req.user && req.user.role == 0) return next();
  return next({ message: "access denied", status: 401 });
};
