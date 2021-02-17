const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user-id is required."],
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "product name is required."],
    },
    image: {
      ref: { type: String, required: true },
      url: { type: String, required: true },
    },
    brand: {
      type: String,
      required: [, "product brand is required."],
    },
    category: {
      type: String,
      required: [true, "product brand is required."],
    },
    description: {
      type: String,
      required: [true, "product description is required."],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
