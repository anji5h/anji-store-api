const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user-id required."],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "product-id is required."],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
