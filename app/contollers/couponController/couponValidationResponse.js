function couponValidationResponse(
  reason = "",
  isValid = false,
  discountAmt = 0
) {
  return { isValid, reason, discountAmt };
}

module.exports = {
  couponValidationResponse,
};
