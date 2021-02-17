const { login, signup, logout } = require("../controller/auth.controller");

const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
// router.post('/reset-password')

module.exports = router;
