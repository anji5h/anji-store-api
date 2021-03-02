const { upload } = require("./../config/cloudinary");

module.exports = async function (req, res, next) {
  try {
    if (!req.file) return next();
    let { secure_url, public_id } = await upload(
      req.file.path,
      req.body.image ? req.body.image.ref : `estore/${req.file.filename}`
    );
    req.body.image = { url: secure_url, ref: public_id };
    next();
  } catch (err) {
    return next({ message: "image upload failed", status: 400 });
  }
};
