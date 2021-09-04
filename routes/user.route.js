const { getUserDetail, updatePassword } = require("../controller/user.controller");
const router = require("express").Router();

router.get("/detail", getUserDetail);
router.put("/update/password", updatePassword);
module.exports = router;
