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

function fetchall(req, res, next) {}

function fetchUserproduct(req, res, next) {}

function search(req, res, next) {}

function searchproduct(req, res, next) {}

function fetchById(req, res, next) {}

function update(req, res, next) {}

function remove(req, res, next) {}

module.exports = {
  addProduct,
  update,
  remove,
  fetchById,
  fetchall,
  fetchUserproduct,
  search,
  searchproduct,
};
