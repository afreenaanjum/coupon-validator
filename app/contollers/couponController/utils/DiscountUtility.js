const calculateDiscount = (couponDetails, totalCartAmt) => {
  const { percentageDiscount, maxDiscountAmt, flatDiscountAmt } = couponDetails;

  return percentageDiscount
    ? Math.min((totalCartAmt * percentageDiscount) / 100, maxDiscountAmt)
    : flatDiscountAmt;
};

module.exports = { calculateDiscount };
