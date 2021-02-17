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

function disableUser(req, res, next) {
  usermodel
    .findById({ _id: req.params.id })
    .then(function (user) {
      if (user) {
        user.updateOne({ _id: user._id }, { status: 2 }, function (err) {
          if (err) {
            return next(err);
          }
        });
      } else {
        next("user not found");
      }
    })
    .catch(function (err) {
      next(err);
    });
}
module.exports = {
  createAdmin,
  disableUser,
  getAllUser,
};
