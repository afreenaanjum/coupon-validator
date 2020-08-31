const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  minPurchaseAmt: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
  },
  maxDiscountAmt: {
    type: Number,
    default: null,
  },
  flatDiscountAmt: {
    type: Number,
    default: null,
  },
  percentageDiscount: {
    type: Number,
    default: null,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = {
  Coupon,
};
