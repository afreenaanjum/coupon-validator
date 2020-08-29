const calculateDiscount = (couponDetails, totalCartAmount) => {
  const { percentage, maxDiscountAmt } = couponDetails;

  return !percentage
    ? maxDiscountAmt
    : Math.min((totalCartAmount * percentage) / 100, maxDiscountAmt);
};

module.exports = { calculateDiscount };
