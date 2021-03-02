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
      lowercase: true,
      trim: true,
      required: [true, "product name is required."],
    },
    image: {
      ref: { type: String, required: [true, "image ref is required."] },
      url: { type: String, required: [true, "image url is required"] },
    },
    brand: {
      type: String,
      lowercase: true,
      trim: true,
      required: [, "product brand is required."],
    },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "product brand is required."],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "product description is required."],
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      default: 0,
    },
    stock: {
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
