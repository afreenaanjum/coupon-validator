const { discountCouponType } = require("../../../enums/couponType");
const updateCouponFields = (couponDetails) => {
  const { couponType } = couponDetails;
  if (couponType == discountCouponType.flat) {
    return { ...couponDetails, maxDiscountAmt: null, percentageDiscount: null };
  } else {
    return { ...couponDetails, flatDiscountAmt: null };
  }
};

module.exports = { updateCouponFields };
