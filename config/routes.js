const express = require("express");
const router = express.Router();
const couponController = require("../app/contollers/couponController/couponController");

router.post("/coupon", couponController.createCoupon);
router.get("/coupon", couponController.getAllCoupons);
router.get("/coupon/:id", couponController.getCoupon);
router.put("/coupon/:id", couponController.updateCoupon);
router.delete("/coupon/:id", couponController.deleteCoupon);
router.post("/coupon/:id/validate", couponController.validateCoupon);

module.exports = router;
