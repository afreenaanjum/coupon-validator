const { discountCouponType } = require("../../../enums/couponType");
const validateCouponType = (couponDetails) => {
  const {
    percentageDiscount,
    maxDiscountAmt,
    flatDiscountAmt,
    couponType,
  } = couponDetails;

  if (couponType && couponType == discountCouponType.flat) {
    return flatDiscountAmt != null;
  } else if (couponType && couponType == discountCouponType.percentage) {
    return percentageDiscount && maxDiscountAmt;
  } else {
    return false; // When there is no coupon type itself
  }
};

module.exports = { validateCouponType };
