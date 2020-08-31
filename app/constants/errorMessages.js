const ErrorMessages = Object.freeze({
  DOCUMENT_NOT_FOUND: "Document not found",
  INVALID_COUPON_FIELDS: "Invalid or incomplete coupon fields.",
  INVALID_TYPE_TOTAL_CART_AMT: "The total cart amount should be a number",
  COUPON_EXPIRED: "The coupon is expired",
  INVALID_CART_AMT:
    "Looks like the cart amount is less than minimum purchase amount to avail the coupon",
  COUPON_NOT_FOUND: "Coupon not found",
  FLAT_DISCOUNT_COUPON_UPDATE_ERROR:
    "Flat discount coupon can't update values percentage or maximum discount amount",
  PERCENTAGE_COUPON_UPDATE_ERROR:
    "Percentage discount coupon can't make changes to ",
});

module.exports = {
  ErrorMessages,
};
