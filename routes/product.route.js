const Productctrl = require("./../controller/product.controller");
const router = require("express").Router();
const upload = require("../middleware/multer");
const authentication = require("./../../../middleware/token-auth");
const cloudinary = require("../middleware/cloudinary");
const productController = require("./../controller/product.controller");
const reviewController = require("../controller/review.controller");

router
  .route("/")
  .get(Productctrl.fetchall)
  .post(authentication, upload.single("image"), cloudinary, Productctrl.add);
router.get("/user", authentication, productController.fetchUserproduct);
router.route("/search").get(productController.search).post(productController.searchproduct);
router
  .route("/:id")
  .get(Productctrl.fetchById)
  .put(authentication, upload.single("image"), cloudinary, Productctrl.update)
  .delete(authentication, Productctrl.remove);

router
  .route("/reviews/:id")
  .get(reviewController.fetchReview)
  .post(authentication, reviewController.createReview);
module.exports = router;
