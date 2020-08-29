const calculateDiscount = (couponDetails, totalCartAmount) => {
  const { percentage, maxDiscountAmt } = couponDetails;
  console.log(!percentage);
  if (!percentage) {
    return maxDiscountAmt;
  } else {
    return Math.min((totalCartAmount * percentage) / 100, maxDiscountAmt);
  }
};

module.exports = { calculateDiscount };
