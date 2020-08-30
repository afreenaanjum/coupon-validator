const { Coupon } = require("../../models/coupon");
const { isInTimeFrame } = require("./utils/validityUtility");
const { calculateDiscount } = require("./utils/discountUtility");
const { validateCouponType } = require("./utils/validateCouponTypeUtility");
const { updateCouponFields } = require("./utils/updateCouponFieldsUtility");
const { StatusCode } = require("../../enums/statusCodes");
const { ErrorMessages } = require("../../constants/errorMessages");
const { couponValidationResponse } = require("./couponValidationResponse");

module.exports.createCoupon = (req, res) => {
  let data = req.body;
  if (!validateCouponType(data)) {
    res.status(StatusCode.badRequest).json(ErrorMessages.COUPON_CREATE_ERROR);
  } else {
    let updatedData = updateCouponFields(data);
    let coupon = new Coupon(updatedData);
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
  const data = req.body;

  if (data.couponType && !validateCouponType(data)) {
    res.status(StatusCode.badRequest).json(ErrorMessages.COUPON_CREATE_ERROR);
  } else {
    Coupon.findOne({ _id: id }, (err, couponDetails) => {
      let updatedData = updateCouponFields(data);
      updatedData = { ...data, ...updatedData };
      for (let key in updatedData) {
        couponDetails[key] = updatedData[key];
      }
      couponDetails
        .save()
        .then((coupon) => {
          res.status(StatusCode.success).json(coupon);
        })
        .catch((err) => {
          res.status(StatusCode.badRequest).json(err);
        });
    }).catch((err) => {
      console.log(err);
      res.status(StatusCode.error).json(err);
    });
  }
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
      console.log(typeof totalCartAmt);
      if (typeof totalCartAmt != "number") {
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
