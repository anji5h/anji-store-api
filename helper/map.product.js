exports.mapProduct = function (productDetail) {
  let product = {};
  if (productDetail.name) product.name = productDetail.name;
  if (productDetail.brand) product.brand = productDetail.brand;
  if (productDetail.category) product.category = productDetail.category;
  if (productDetail.description) product.description = productDetail.description;
  if (productDetail.image) product.image = productDetail.image;
  if (productDetail.stock) product.stock = productDetail.stock;
  if (productDetail.price) product.price = productDetail.price;
  if (productDetail.user) product.user = productDetail.user;
  return product;
};
