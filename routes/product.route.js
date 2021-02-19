const router = require("express").Router();
const authentication = require("./../middleware/jwt");
const upload = require("./../middleware/multer");
const productController = require("./../controller/product.controller");
const reviewController = require("../controller/review.controller");
const uploadImage = require("../middleware/uploadImage");

router
  .route("/")
  .get(productController.fetchall)
  .post(authentication, upload.single("image"), uploadImage, productController.addProduct);
router.get("/user", authentication, productController.fetchUserproduct);
router.route("/search").get(productController.search).post(productController.searchproduct);
router
  .route("/:id")
  .get(productController.fetchById)
  .put(authentication, upload.single("image"), uploadImage, productController.update)
  .delete(authentication, productController.remove);

router
  .route("/reviews/:id")
  .get(reviewController.fetchReview)
  .post(authentication, reviewController.createReview);
module.exports = router;
