const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "name is required."],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "username is required."],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    role: {
      type: Number,
      enum: [0, 1], // 0:admin & 1:user
      default: 1,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required."],
      validate: {
        validator: function (email) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          );
        },
        message: "please provide a valid email address.",
      },
    },
    token: String,
    tokenExpiry: Date,
    status: {
      type: Number,
      enum: [0, 1, 2], // 0:not verified, 1:active, 2: disabled/suspended
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  if (this.password.length < 8) {
    return next("password must have 8 characters or more.");
  }
  bcrypt.hash(this.password, 10, (err, hashed) => {
    if (err) return next(err);
    this.password = hashed;
    next();
  });
});
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const usermodel = mongoose.model("user", userSchema);
module.exports = usermodel;
