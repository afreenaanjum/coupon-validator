function couponValidationResponse(
  message = "",
  isValid = false,
  discountAmt = 0
) {
  return { isValid, message, discountAmt };
}

module.exports = {
  couponValidationResponse,
};
