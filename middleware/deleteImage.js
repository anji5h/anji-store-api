const { destroy } = require("./../config/cloudinary");

module.exports = async function (req, res, next) {
  try {
    await destroy(req.body && req.body.image && req.body.image.ref);
    next();
  } catch (err) {
    return next({ message: "image deletion failed", status: 400 });
  }
};
