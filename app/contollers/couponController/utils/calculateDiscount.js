const calculateDiscount = (couponDetails, totalCartAmt) => {
  const { percentage, maxDiscountAmt, flatDiscountAmt } = couponDetails;

  return percentage
    ? Math.min((totalCartAmt * percentage) / 100, maxDiscountAmt)
    : flatDiscountAmt;
};

module.exports = { calculateDiscount };
