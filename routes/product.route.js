const router = require("express").Router();
const authentication = require("./../middleware/jwt");
const upload = require("./../middleware/multer");
const productController = require("./../controller/product.controller");
const reviewController = require("../controller/review.controller");
const uploadImage = require("../middleware/uploadImage");
const checkProduct = require("../middleware/checkProduct");
const deleteImage = require("../middleware/deleteImage");

router
  .route("/")
  .get(productController.getAllProduct)
  .post(authentication, upload.single("image"), uploadImage, productController.addProduct);
router.get("/top", productController.getTopProducts);
router.route("/search").get(productController.search).post(productController.searchproduct);

router
  .route("/reviews/:id")
  .get(reviewController.fetchReview)
  .post(authentication, reviewController.createReview);
router
  .route("/:id")
  .get(productController.getProductById)
  .put(
    authentication,
    upload.single("image"),
    checkProduct,
    uploadImage,
    productController.updateProduct
  )
  .delete(authentication, checkProduct, deleteImage, productController.removeProduct);
module.exports = router;
