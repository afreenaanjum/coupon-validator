const { discountCouponType } = require("../../../enums/discountType");

const updateCouponFields = (couponDetails) => {
  const { discountType } = couponDetails;
  if (discountType == discountCouponType.flat) {
    return { ...couponDetails, maxDiscountAmt: null, percentageDiscount: null };
  } else {
    return { ...couponDetails, flatDiscountAmt: null };
  }
};

const validateFieldsForDiscountType = (couponDetails) => {
  const {
    percentageDiscount,
    maxDiscountAmt,
    flatDiscountAmt,
    discountType,
  } = couponDetails;

  if (discountType && discountType == discountCouponType.flat) {
    return flatDiscountAmt != null;
  } else if (discountType && discountType == discountCouponType.percentage) {
    return percentageDiscount && maxDiscountAmt;
  } else {
    return false; // When there is other undesired value in discoutnType.
  }
};

module.exports = { updateCouponFields, validateFieldsForDiscountType };
