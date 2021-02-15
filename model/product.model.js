const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      required: true,
      type: Number,
    },
    image: {
      type: String,
      default: "noimg.png",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    discount: {
      discountedItem: Boolean,
      discount: Number,
    },
    manuDate: Date,
    expiryDate: Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.index({name:'text'})
const productmodel = mongoose.model("product", productSchema);
module.exports = productmodel;
