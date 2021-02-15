const router = require("express").Router();
const jwt = require("../middleware/jwt");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
// const productRoute= require('./product.route');
// const authentication = require('./../middleware/jwt')

router.use("/auth", authRoute);
router.use("/user", jwt, userRoute);
router.use("/admin", adminRoute);
// router.use('/product',productRoute);

module.exports = router;
