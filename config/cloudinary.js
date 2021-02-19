const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = function (path, ref) {
  return cloudinary.uploader.upload(path, {
    public_id: ref,
    overwrite: true,
  });
};
const destroy = function (ref) {
  return cloudinary.uploader.destroy(ref, { invalidate: true });
};
module.exports = {
  upload,
  destroy,
};
