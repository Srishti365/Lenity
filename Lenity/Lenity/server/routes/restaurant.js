const express = require("express");
const router = require("express-promise-router")();
const models = require("../models/models");
const passport = require("passport");
const passportConf = require("../passport");

const nodemailer = require("nodemailer");
const passportSignIn = passport.authenticate("restaurant-local-strategy", {
  session: false
});
const passportJWT = passport.authenticate("restaurant-jwt-token", {
  session: false
});
const Restaurant = models.restaurant;
const Coupon = models.coupon;
const User = models.profile;
const Food = models.food;

const UsersController = require("../controllers/users");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email",
    pass: "password"
  }
});

router.route("/signin").post(passportSignIn, UsersController.logIn);

router.route("/applyCoupon").post(passportJWT, async (req, res, next) => {
  const restaurant = req.user.name;
  const { coupon } = req.body;
  const user = await Coupon.findOne({ code: coupon, restaurant: restaurant });
  // console.log("lalalalala");
  // console.log(user.id);
  if (!user) {
    return res.json({ error: "Invalid Coupon" });
  }

  const profile = await User.findOne({ "coupon._id": user.id });
  console.log(profile);

  const html = `Hi ${profile.local.username},
        Your coupon is successfully applied and get a discount of ${user.dis_per}.
        Enjoy your meal.!!!!!`;

  const mailOptions = {
    from: "email",
    to: profile.local.email,
    subject: "Please check your email",
    text: html
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent" + info.response);
    }
  });

  await User.update(
    { "coupon._id": user.id },
    { $pull: { coupon: { _id: user.id } } },
    { multi: true }
  );
  await Coupon.findByIdAndRemove(user.id);

  return res.json({ sucess: "Coupon Successfully Applied!!!!" });
});

router.route("/donate").post(passportJWT, async (req, res, next) => {
  var quantity = req.body.quantity;
  var name = req.user.name;
  var location = req.user.location;

  var food = new Food({
    donatedBy: name,
    quantity: quantity,
    location: location,
    status: 0
  });

  console.log(food);

  await food.save().then(async function () {
    await Restaurant.findOne({ name: req.user.name }).then(async function (
      record
    ) {
      record.food.push(food);
      record.save();
    });
  });
});

router.route("/allCoupons").get(passportJWT, async (req, res, next) => {
  const restaurant = req.user.name;
  const coupon = await Coupon.find({ restaurant: restaurant });
  res.json(coupon);
});

module.exports = router;
