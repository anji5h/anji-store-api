const { mapMongoError } = require("../helper/map.error");
const usermodel = require("../model/user.model");
require("dotenv").config();

async function createAdmin(req, res, next) {
  try {
    await usermodel.create({
      name: process.env.ADMIN_NAME,
      username: process.env.ADMIN_USERNAME,
      email: process.env.EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: process.env.ADMIN_ROLE,
      verified: true,
    });
    res.json({ message: "admin user created" }).status(201);
  } catch (err) {
    return next({ message: mapMongoError(err), status: 400 });
  }
}
async function getAllUser(req, res, next) {
  try {
    let user = await usermodel.find(
      {},
      {
        name: 1,
        email: 1,
        username: 1,
        role: 1,
        disabled: 1,
        verified: 1,
      }
    );
    res.status(200).json({ user });
  } catch (err) {
    next({ message: "failed to retrieve data.", status: 400 });
  }
}

async function disableUser(req, res, next) {
  try {
    let user = await usermodel
      .findById(req.params.id, { username: 1, role: 1, disabled: 1 })
      .lean();
    if (!user) throw { message: "user not found", status: 400 };
    if (user.role === 0) throw { messsage: "access denied", status: 400 };
    await usermodel.updateOne({ _id: req.params.id }, { disabled: user.disabled ? false : true });
    res.json({ message: "done" }).status(201);
  } catch (err) {
    next({ message: err.message, status: err.status });
  }
}
module.exports = {
  createAdmin,
  disableUser,
  getAllUser,
};
