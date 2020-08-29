const { Coupon } = require("../../models/coupon");
const { checkValidity } = require("./utils/checkValidity");
const { calculateDiscount } = require("./utils/calculateDiscount");

module.exports.createCoupon = (req, res) => {
  const data = req.body;
  const coupon = new Coupon(data);
  coupon
    .save()
    .then((coupon) => {
      res.status("200").json({ coupon });
    })
    .catch((err) => {
      res.status("400").json(err);
    });
};

module.exports.getAllCoupons = (req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.status("200").json(coupons);
    })
    .catch((err) => {
      res.status("404").json(err);
    });
};

module.exports.getCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOne({ _id: id })
    .then((coupon) => {
      res.status("200").json(coupon);
    })
    .catch((err) => {
      res.status("404").json(err);
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
      res.status("200").json(coupon);
    })
    .catch((err) => {
      res.status("404").json(err);
    });
};

module.exports.deleteCoupon = (req, res) => {
  const id = req.params.id;
  Coupon.findOneAndDelete({ _id: id })
    .then((coupon) => {
      res.status("200").json({});
    })
    .catch((err) => {
      res.status("404").json({});
    });
};

module.exports.validateCoupon = (req, res) => {
  const id = req.params.id;
  const { totalCartAmt } = req.query;

  Coupon.findOne({ _id: id })
    .then((coupon) => {
      if (checkValidity(coupon, totalCartAmt)) {
        let discountAmount = calculateDiscount(coupon, totalCartAmt);
        res.status("200").json({ discountAmount });
      } else {
        if (totalCartAmt < coupon.minPurchaseAmt) {
          res
            .status("400")
            .send(
              "Looks like the cart amount is less than minimum purchase amount to avail the coupon"
            );
        } else {
          res.status("404").send("The coupon is expired");
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status("404").send("Coupon not found");
    });
};
