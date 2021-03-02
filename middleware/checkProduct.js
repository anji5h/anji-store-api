const productModel = require("../model/product.model");

module.exports = async function (req, res, next) {
  try {
    let product = await productModel.findById(req.params.id, { image: 1 }).lean();
    if (!product) throw { message: "product not found", status: 400 };
    req.body.image = product.image;
    next();
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
};
