const usermodel = require("./../model/user.model");
const mailer = require("../config/nodemailer");
const mailcontent = require("../template/mailcontent");
const token = require("./../token/token");
const { mapUser } = require("../helper/map.user");
const { mapMongoError } = require("../helper/map.error");
// login
async function login(req, res, next) {
  try {
    let user = await usermodel.findOne(
      {
        $or: [{ username: { $eq: req.body.username } }, { email: { $eq: req.body.username } }],
      },
      {
        token: 0,
        tokenExpiry: 0,
      }
    );
    if (!user) {
      throw { message: "incorrect username/email", status: 401 };
    }
    if (user.disabled) {
      throw { message: "your account is suspended. please contact support." };
    }
    let isMatchPassword = await user.checkPassword(req.body.password, user.password);
    if (!isMatchPassword) throw { message: "incorrect password", status: 401 };
    const authToken = await token.createToken({ id: user._id });
    res.cookie("auth_token", authToken, { httpOnly: true }).json({ user }).status(201);
  } catch (err) {
    return next({ message: err.message, status: err.status });
  }
}

async function signup(req, res, next) {
  try {
    let newUser = new usermodel(mapUser(req.body));
    await newUser.save();
    res.send("done").status(201);
  } catch (err) {
    return next({ message: mapMongoError(err), status: 400 });
  }
}
function logout(req, res) {
  res.clearCookie("auth_token").json({ message: "logged out" }).status(201);
}
async function resetPassword(req, res, next) {
  usermodel.findOne({ email: req.body.email }).exec(function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next("Account doesn't exists");
    }
    user.passwordResettoken = crypto.randomBytes(12).toString("hex");
    user.passwordExpirytime = Date.now() + 1000 * 60 * 5;
    user.save(function (err, newuser) {
      if (err) {
        return next(err);
      }
      mailer.sendMail(
        mailcontent.forgot_password({
          name: newuser.username,
          email: newuser.email,
          link: `${req.headers.origin}/resetpassword?id=${newuser._id}&token=${newuser.passwordResettoken}`,
        }),
        function (err) {
          if (err) {
            return next("Error sending mail");
          }
          res.send("DONE").status(200);
        }
      );
    });
  });
}

async function resetPassword(req, res, next) {
  usermodel
    .findById(req.query.id)
    .then(function (user) {
      if (!user) {
        return next("User not available");
      }
      if (user.passwordExpirytime < Date.now()) {
        return next("token expired");
      }
      if (user.passwordResettoken !== req.query.token) {
        return next("Invalid token");
      }
      if (user.password === req.body.password) {
        return next("New password match with old one");
      }
      const newtoken = crypto.randomBytes(20).toString("hex");
      user.update(
        {
          password: bcrypt.hashSync(req.body.password, 10),
          passwordExpirytime: Date.now(),
          passwordResettoken: newtoken,
        },
        function (err) {
          if (err) {
            return next(err);
          }
          res.send("done").status(200);
        }
      );
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  login,
  signup,
  logout,
};
