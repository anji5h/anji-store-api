const usermodel = require("../model/user.model");
const bcrypt = require("bcrypt");
// routing

function getUserDetail(req, res) {
  res.json({ user: req.user }).status(201);
}

async function updatePassword(req, res, next) {
  try {
    let data = {
      new_password: req.body.new_password,
      confrim_password: req.body.confrim_password,
      old_password: req.body.old_password,
    };
    if (data.new_password !== data.confrim_password)
      throw { message: "password don't match", status: 400 };
    let isMatch = await bcrypt.compare(data.old_password, req.user.password);
    if (!isMatch) throw { message: "old password don't match", status: 400 };
    if (data.old_password === data.new_password)
      throw { message: "old password match with new password.", status: 400 };
    let user = await usermodel.findById(req.user._id, { username: 1 });
    user.password = data.new_password;
    await user.save();
    res.json({ message: "password updated" }).status(201);
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}

module.exports = {
  getUserDetail,
  updatePassword,
};
