const router = require("express").Router();
const authentication = require("../middleware/jwt");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const productRoute = require("./product.route");
const checkAdmin = require("../middleware/checkAdmin");
const { createAdmin } = require("../controller/admin.controller");

router.use("/auth", authRoute);
router.use("/user", authentication, userRoute);
router.use("/admin", authentication, checkAdmin, adminRoute);
router.use("/product", productRoute);
router.get("/create/admin", createAdmin);
module.exports = router;
