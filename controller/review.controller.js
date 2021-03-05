const { mapMongoError } = require("../helper/map.error");
const { findOne } = require("../model/review.model");
const reviewModel = require("../model/review.model");

async function fetchReview(req, res, next) {
  try {
    let reviews = await reviewModel
      .find({ product: req.params.id })
      .sort({ _id: -1 })
      .populate("user", { username: 1 })
      .lean();
    res.json({ reviews }).status(201);
  } catch (err) {
    return next({ message: "failed to fetch data", status: 400 });
  }
}

async function createReview(req, res, next) {
  try {
    const data = {
      comment: req.body.comment,
      rating: req.body.rating,
      user: req.user._id,
      product: req.params.id,
    };
    if (req.user && req.user.role === 0) throw { message: "access denied", status: 400 };
    let review = await findOne({ user: data.user, product: data.product }).lean();
    if (review) throw { message: "you have already added the review", status: 400 };
    await reviewModel.create(data);
    res.json({ message: "review added." }).status(201);
  } catch (err) {
    next({ message: mapMongoError(err), status: 400 });
  }
}

module.exports = {
  fetchReview,
  createReview,
};
