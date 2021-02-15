const { Error } = require("mongoose");

exports.mapMongoError = function (err) {
  if (err instanceof Error.ValidationError) {
    for (key in err.errors) {
      return err.errors[key].message;
    }
  }
  if (err.name === "MongoError" && err.code === 11000) {
    for (key in err.keyPattern) {
      return `${key} is already taken.`;
    }
  }
  return err;
};
