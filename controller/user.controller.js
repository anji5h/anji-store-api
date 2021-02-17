const { mapUser } = require("../helper/map.user");
const usermodel = require("../model/user.model");
// routing

function getUserDetail(req, res) {
  res.json({ user: req.user }).status(201);
}



function searchUser(req, res, next) {
  if (req.loggedUser.role === 1) {
    usermodel
      .find(
        { username: new RegExp(`^${req.query.name}`, "i") },
        { passwordExpirytime: 0, passwordResettoken: 0, password: 0 }
      )
      .exec(function (err, done) {
        if (err) {
          return next(err);
        }
        res.status(200).json(done);
      });
  } else {
    return next("Access denied");
  }
}

function getUser(req, res, next) {
  usermodel.findById({ _id: req.params.id }).exec(function (err, done) {
    if (err) {
      return next(err);
    }
    res.json(done).status(200);
  });
}

function updateUser(req, res, next) {
  usermodel
    .findById({ _id: req.params.id })
    .then(function (user) {
      if (user) {
        mapUser(req.body).save(function (err, done) {
          if (err) {
            next(err);
          } else {
            res.json(done).status(200);
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
  getUserDetail,
  getUser,
  updateUser,
};
