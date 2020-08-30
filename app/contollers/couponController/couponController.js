const { Coupon } = require("../../models/coupon");
const { isInTimeFrame } = require("./utils/ValidityUtility");
const { calculateDiscount } = require("./utils/DiscountUtility");
const { StatusCode } = require("../../enums/statusCodes");
const { ErrorMessages } = require("../../constants/errorMessages");
const { couponValidationResponse } = require("./couponValidationResponse");

module.exports.createCoupon = (req, res) => {
  const data = req.body;
  const coupon = new Coupon(data);
  if (data.percentageDiscount && data.flatDiscountAmt) {
    res.status(StatusCode.badRequest).json(ErrorMessages.COUPON_CREATE_ERROR);
  } else {
    coupon
      .save()
      .then((coupon) => {
        res.status(StatusCode.success).json(coupon);
      })
      .catch((err) => {
        res.status(StatusCode.badRequest).json(err);
      });
  }
};

module.exports.getAllCoupons = (req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.status(StatusCode.success).json(coupons);
    })
    .catch((err) => {
      res.status(StatusCode.error).json(err);
    });
};

module.exports.getCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOne({ _id: id })
    .then((coupon) => {
      res.status(StatusCode.success).json(coupon);
    })
    .catch((err) => {
      console.log(err);
      res.status(StatusCode.error).json(err);
    });
};

module.exports.updateCoupon = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Coupon.findOneAndUpdate(
    { _id: id },
    { $set: body },
    { new: true, runValidators: true }
  )
    .then((coupon) => {
      console.log(err);
      res.status(StatusCode.success).json(coupon);
    })
    .catch((err) => {
      res.status(StatusCode.error).json(err);
    });
};

module.exports.deleteCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOneAndDelete({ _id: id })
    .then(() => {
      res.status(StatusCode.success).json({});
    })
    .catch((err) => {
      res.status(StatusCode.error).json({});
    });
};

module.exports.validateCoupon = (req, res) => {
  const id = req.params.id;
  const { totalCartAmt } = req.body;

  Coupon.findOne({ _id: id })
    .then((coupon) => {
      if (typeof totalCartAmt != Number) {
        let response = couponValidationResponse(
          ErrorMessages.INVALID_TYPE_TOTAL_CART_AMT
        );
        res.status(StatusCode.badRequest).send(response);
      } else if (!isInTimeFrame(coupon)) {
        let response = couponValidationResponse(ErrorMessages.COUPON_EXPIRED);
        res.status(StatusCode.error).send(response);
      } else if (totalCartAmt < coupon.minPurchaseAmt) {
        let response = couponValidationResponse(ErrorMessages.INVALID_CART_AMT);
        res.status(StatusCode.badRequest).send(response);
      } else {
        let discountAmount = calculateDiscount(coupon, totalCartAmt);
        let response = couponValidationResponse("", true, discountAmount);
        res.status(StatusCode.success).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(StatusCode.error).send(ErrorMessages.COUPON_NOT_FOUND);
    });
};
