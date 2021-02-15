const { getUserDetail } = require("../controller/user.controller");
const router = require("express").Router();

router.get("/getuserdetail", getUserDetail);
 module.exports = router;