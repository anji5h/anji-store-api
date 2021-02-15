const ProductModel = require("../../model/product.model");
// const cloudinary = require("./../../../config/cloudinary.");

function map_product(product, productDetail) {
  if (productDetail.name) {
    product.name = productDetail.name;
  }
  if (productDetail.brand) {
    product.brand = productDetail.brand;
  }
  if (productDetail.category) {
    product.category = productDetail.category;
  }
  if (productDetail.image) {
    product.image = productDetail.image;
  }
  if (productDetail.price) {
    product.price = productDetail.price;
  }
  if (productDetail.manuDate) {
    product.manuDate = productDetail.manuDate;
  }
  if (productDetail.expiryDate) {
    product.expiryDate = productDetail.expiryDate;
  }
  if (productDetail.description) {
    product.description = productDetail.description;
  }
  if (productDetail.user) {
    product.user = productDetail.user;
  }
  if (productDetail.discountedItem) {
    product.discount = {
      discountedItem: productDetail.discountedItem,
      discount: productDetail.discount,
    };
  } else {
    product.discount = {
      discountedItem: false,
      discount: "",
    };
  }
  return product;
}

function mapSearch(data) {
  let condition = {};
  if (data.brand) condition.brand = data.brand;
  if (data.category) condition.category = data.category;
  if (data.minprice && data.maxprice)
    condition.price = { $gte: Number(data.minprice), $lte: Number(data.maxprice) };
  else if (data.minprice) condition.price = { $gte: Number(data.minprice) };
  else if (data.maxprice) condition.price = { $lte: Number(data.maxprice) };
  return condition;
}
/*
 * insert onbject
 * @params data
 * returns promise
 */
function insert(data) {
  return ProductModel.create(map_product({}, data));
}

/*
 * search product name
 * @params condition
 * returns promise
 */

function search(condition) {
  return ProductModel.aggregate(condition);
}

async function searchproduct(condition, pagenumber) {
  let pageNum = (Number(pagenumber) || 1) - 1;
  let product = await ProductModel.aggregate([
    {
      $search: {
        autocomplete: {
          query: `${condition.name}`,
          path: "name",
        },
      },
    },
    {
      $match: mapSearch(condition),
    },
    { $limit: 8 },
    { $skip: pageNum * 8 },
    {
      $project: {
        user: 0,
        reviews: 0,
      },
    },
  ]);
  let count = await ProductModel.aggregate([
    {
      $search: {
        autocomplete: {
          query: `${condition.name}`,
          path: "name",
        },
      },
    },
    {
      $match: mapSearch(condition),
    },
    {
      $count: "total",
    },
  ]);
  return { product, count: count.length ? count[0].total : 0 };
}

/*
 * find object
 * @params condition
 * returns promise
 */
async function find(page, condition) {
  let perPage = Number(page.pageSize) || 8;
  let pageNum = (Number(page.pageNumber) || 1) - 1;
  let limitProduct = perPage * pageNum;
  let product = await ProductModel.find(condition)
    .limit(perPage)
    .skip(limitProduct)
    .sort({
      _id: -1,
    })
    .populate("user", {
      username: 1,
    });
  let count = await ProductModel.countDocuments(condition);
  return { product, count };
}

function findById(id) {
  return ProductModel.findById(id).populate("user", { username: 1 });
}
/*
 * update object
 * @params id and data
 * returns promise
 */
function update(id, data) {
  return new Promise(function (resolve, reject) {
    ProductModel.findById(id)
      .then(function (product) {
        if (product) {
          let oldimage = product.image;
          let updatedProduct = map_product(product, data);
          updatedProduct.save(function (err, done) {
            if (err) {
              return reject(err);
            }
            resolve({ product: done, oldimage });
          });
        } else {
          reject("product not found");
        }
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

/*
 * remove onbject
 * @params id
 * returns promise
 */
function remove(id) {
  return new Promise((resolve, reject) => {
    ProductModel.findById(id)
      .then((product) => {
        if (product) {
          if (product.image) cloudinary.uploader.destroy(`Product-image/${product.image}`);
          ProductModel.deleteOne({ _id: id }, function (err) {
            if (err) {
              return reject(err);
            }
            resolve("done");
          });
        } else {
          reject("Product not found");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  insert,
  find,
  update,
  remove,
  map_product,
  findById,
  search,
  searchproduct,
};
