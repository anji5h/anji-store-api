const { mapMongoError } = require("../helper/map.error");
const { mapProduct } = require("../helper/map.product");
const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");

async function addProduct(req, res, next) {
  try {
    let data = req.body;
    data.user = req.user._id;
    await productModel.create(mapProduct(data));
    res.json({ message: "new product added" }).status(201);
  } catch (err) {
    next({ messgae: mapMongoError(err), status: 400 });
  }
}

async function getAllProduct(req, res, next) {
  try {
    let pageSize = 10;
    let page = Number(req.query.pagenumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    let query1 = productModel
      .find(keyword)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();
    let query2 = productModel.countDocuments(keyword);
    let [products, count] = await Promise.all([query1, query2]);
    res.json({ products, page, pages: Math.ceil(count / pageSize) }).status(201);
  } catch (err) {
    console.log(err);
    next({ message: "product fetch failed", status: 400 });
  }
}

async function getProductById(req, res, next) {
  try {
    let product = await productModel.findById(req.params.id).lean();
    res.json({ product }).status(201);
  } catch (err) {
    next({ message: "product fetch failed", status: 400 });
  }
}

async function updateProduct(req, res, next) {
  try {
    let data = req.body;
    data.user = req.user._id;
    await productModel.updateOne({ _id: req.params.id }, mapProduct(data));
    res.json({ message: "product updated" }).status(201);
  } catch (err) {
    next({ message: "product update failed", status: 400 });
  }
}

async function getTopProducts(req, res, next) {
  try {
    let products = await productModel.find({}).sort({ rating: -1 }).limit(3).lean();
    res.json({ products }).status(201);
  } catch (err) {
    next({ message: "product fetch failed", status: 400 });
  }
}

async function removeProduct(req, res, next) {
  try {
    await productModel.deleteOne({ _id: req.params.id });
    res.json({ message: "product deleted" }).status(201);
  } catch (err) {
    next({ message: "product deletion failed", status: 400 });
  }
}

async function addToCart(req, res, next) {
  try {
    if (req.user && req.user.role === 0) throw { message: "access denied", status: 400 };
    const data = {
      product: req.params.id,
      user: req.user._id,
      quantity: req.body.quantity,
    };
    let cartItem = await cartModel
      .findOne({
        user: { $eq: data.user },
        product: { $eq: data.product },
      })
      .lean();
    if (cartItem) throw { message: "product already added to cart", status: 400 };
    await cartModel.create(data);
    res.json({ message: "product added to cart" }).status(201);
  } catch (err) {
    return next({ message: err.message, status: err.status });
  }
}

async function deleteFromCart(req, res, next) {
  try {
    let cartItem = await cartModel.findById(req.params.id).lean();
    if (!cartItem) throw { message: "product not available on cart", status: 400 };
    await cartModel.deleteOne({ _id: req.params.id });
    res.json({ message: "product deleted from cart" }).status(201);
  } catch (err) {
    return next({ message: err.message, status: err.status });
  }
}

async function getFromCart(req, res, next) {
  try {
    let cart = await cartModel
      .find({ user: req.user._id })
      .populate("product", { name: 1, image: 1, price: 1, stock: 1 })
      .lean();
    res.json({ cart }).status(201);
  } catch (err) {
    return next({ message: err.message, status: err.status });
  }
}
module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getAllProduct,
  getTopProducts,
  addToCart,
  deleteFromCart,
  getFromCart,
};
