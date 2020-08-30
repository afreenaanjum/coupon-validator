const ErrorMessages = Object.freeze({
  COUPON_CREATE_ERROR: "Coupon can either have a percentage or flat-discount",
  INVALID_TYPE_TOTAL_CART_AMT: "The total cart amount should be a number",
  COUPON_EXPIRED: "The coupon is expired",
  INVALID_CART_AMT:
    "Looks like the cart amount is less than minimum purchase amount to avail the coupon",
  COUPON_NOT_FOUND: "Coupon not found",
});

module.exports = {
  ErrorMessages,
};
