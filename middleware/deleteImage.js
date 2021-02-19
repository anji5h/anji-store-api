const { destroy } = require("./../config/cloudinary");

module.exports = async function (req, res, next) {
  try {
    if (!req.image) return next();
    await destroy(req.image);
    next();
  } catch (err) {
    return next({ message: "image deletion failed", status: 400 });
  }
};
