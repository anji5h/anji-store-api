const reviewmodel = require("../model/review.model");

async function fetchReview(req, res, next) {
  let pageNum = (Number(req.query.pagenumber) || 1) - 1;
  let limitProduct = 3 * pageNum;
  try {
    let reviews = await reviewmodel
      .find({ product: req.params.id })
      .sort({ _id: -1 })
      .limit(3)
      .skip(limitProduct)
      .populate("user", { username: 1 });
    let count = await reviewmodel.countDocuments({ product: req.params.id });
    res.json({ reviews, count }).status(200);
  } catch (err) {
    return next("error fetching review");
  }
}

function createReview(req, res, next) {
  const data = {
    review: req.body.review,
    rating: req.body.rating,
    user: req.loggedUser._id,
    product: req.params.id,
  };
  reviewmodel.create(data, function (err) {
    if (err) {
      return next("error saving review");
    }
    res.send("done").status(200);
  });
}

module.exports = {
  fetchReview,
  createReview,
};
