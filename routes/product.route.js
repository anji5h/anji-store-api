const router = require("express").Router();
const authentication = require("./../middleware/jwt");
const productController = require("./../controller/product.controller");
const reviewController = require("../controller/review.controller");

router.get("/", productController.getAllProduct);
router.get("/top", productController.getTopProducts);
router.route("/search").get(productController.search).post(productController.searchproduct);

router
  .route("/reviews/:id")
  .get(reviewController.fetchReview)
  .post(authentication, reviewController.createReview);
router.get("/cart", authentication, productController.getFromCart);
router
  .route("/cart/:id")
  .post(authentication, productController.addToCart)
  .delete(authentication, productController.deleteFromCart);
router.get("/:id", productController.getProductById);
module.exports = router;
