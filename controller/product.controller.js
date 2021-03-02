const { mapMongoError } = require("../helper/map.error");
const { mapProduct } = require("../helper/map.product");
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
    let req1 = productModel
      .find(keyword)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .lean();
    let req2 = productModel.countDocuments(keyword);
    let [products, count] = await Promise.all([req1, req2]);
    res.json({ products, page, pages: Math.ceil(count / pageSize) }).status(201);
  } catch (err) {
    console.log(err);
    next({ message: "product fetch failed", status: 400 });
  }
}

function search(req, res, next) {}

function searchproduct(req, res, next) {}

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
    let products = await productModel.find({}).sort({ rating: -1 }).limit(3);
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

module.exports = {
  addProduct,
  updateProduct,
  removeProduct,
  getProductById,
  getAllProduct,
  search,
  searchproduct,
  getTopProducts,
};
