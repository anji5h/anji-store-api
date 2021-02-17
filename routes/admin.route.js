const { createAdmin, getAllUser } = require("../controller/admin.controller");
const jwt = require("../middleware/jwt");

const router = require("express").Router();

router.get("/getusers", jwt, getAllUser);
router.get("/createadmin", createAdmin);

module.exports = router;
