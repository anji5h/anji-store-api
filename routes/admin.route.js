const { createAdmin } = require("../controller/admin.controller");

const router = require("express").Router();

router.get("/createadmin", createAdmin);

module.exports = router;