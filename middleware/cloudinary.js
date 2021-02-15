const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async function (path, filename) {
  return cloudinary.uploader.upload(path, {
    public_id: filename,
    overwrite: true,
  });
};
const destroy = async function (filename) {
  return cloudinary.uploader.destroy(filename, { invalidate: true });
};
module.exports = {
  upload,
  destroy,
};
