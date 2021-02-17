const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user-id required."],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: [true, "product-id is required."],
    },
    comment: {
      type: String,
      required: [true, "comment is required."],
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      required: [true, "rating is required."],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const reviewModel = mongoose.model("review", reviewSchema);
module.exports = reviewModel;
