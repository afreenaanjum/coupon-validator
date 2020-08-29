const isValid = (couponDetails, totalCartAmount) => {
  let currentDate = Date.now();

  return (
    currentDate >= couponDetails.startDate &&
    currentDate <= couponDetails.endDate &&
    totalCartAmount >= couponDetails.minPurchaseAmt
  );
};

module.exports = { checkValidity: isValid };
