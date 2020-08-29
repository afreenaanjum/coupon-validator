const express = require("express");
const router = express.Router();
const couponController = require("../app/contollers/couponController/couponController");

router.post("/coupons", couponController.createCoupon);
router.get("/coupons", couponController.getAllCoupons);
router.get("/coupons/:id", couponController.getCoupon);
router.put("/coupons/:id", couponController.updateCoupon);
router.delete("/coupons/:id", couponController.deleteCoupon);
router.get("/coupons/validate/:id", couponController.validateCoupon);

module.exports = router;
