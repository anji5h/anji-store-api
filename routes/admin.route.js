const { getAllUser, disableUser } = require("../controller/admin.controller");
const productController = require("./../controller/product.controller");
const uploadImage = require("../middleware/uploadImage");
const deleteImage = require("../middleware/deleteImage");
const checkProduct = require("../middleware/checkProduct");
const upload = require("../middleware/multer");

const router = require("express").Router();

router.get("/users", getAllUser);
router.put("/users/:id/disable", disableUser);

router.post("/products", upload.single("image"), uploadImage, productController.addProduct);
router
  .route("/products/:id")
  .put(upload.single("image"), checkProduct, uploadImage, productController.updateProduct)
  .delete(checkProduct, deleteImage, productController.removeProduct);

module.exports = router;
