const { Coupon } = require("../../models/coupon");
const { isInTimeFrame } = require("./utils/isInTimeFrame");
const { calculateDiscount } = require("./utils/calculateDiscount");
const { STATUSCODES } = require("../../constants/enums/statusCodes");
const { ERROR_MESSAGES } = require("../../constants/errorMessages");
module.exports.createCoupon = (req, res) => {
  const data = req.body;
  const coupon = new Coupon(data);
  coupon
    .save()
    .then((coupon) => {
      res.status(STATUSCODES.SUCCESS).json(coupon);
    })
    .catch((err) => {
      res.status(STATUSCODES.BAD_REQUEST).json(err);
    });
};

module.exports.getAllCoupons = (req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.status(STATUSCODES.SUCCESS).json(coupons);
    })
    .catch((err) => {
      res.status(STATUSCODES.ERROR).json(err);
    });
};

module.exports.getCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOne({ _id: id })
    .then((coupon) => {
      res.status(STATUSCODES.SUCCESS).json(coupon);
    })
    .catch((err) => {
      res.status(STATUSCODES.ERROR).json(err);
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
      res.status(STATUSCODES.SUCCESS).json(coupon);
    })
    .catch((err) => {
      res.status(STATUSCODES.ERROR).json(err);
    });
};

module.exports.deleteCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOneAndDelete({ _id: id })
    .then(() => {
      res.status(STATUSCODES.SUCCESS).json({});
    })
    .catch((err) => {
      res.status(STATUSCODES.ERROR).json({});
    });
};

module.exports.validateCoupon = (req, res) => {
  const id = req.params.id;
  const { totalCartAmt } = req.body;

  Coupon.findOne({ _id: id })
    .then((coupon) => {
      if (!isInTimeFrame(coupon)) {
        res.status(STATUSCODES.ERROR).send(ERROR_MESSAGES.COUPON_EXPIRED);
      } else if (totalCartAmt < coupon.minPurchaseAmt) {
        res
          .status(STATUSCODES.BAD_REQUEST)
          .send(ERROR_MESSAGES.INVALID_CART_AMT);
      } else {
        let discountAmount = calculateDiscount(coupon, totalCartAmt);
        res.status(STATUSCODES.SUCCESS).json({ discountAmount });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(STATUSCODES.ERROR).send(ERROR_MESSAGES.COUPON_NOT_FOUND);
    });
};
