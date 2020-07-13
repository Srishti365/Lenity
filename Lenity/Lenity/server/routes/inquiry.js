const express = require("express");
const router = require("express-promise-router")();
const models = require("../models/models");
//const Food = models.food;
//const Item = models.item;
const passport = require("passport");
const passportConf = require("../passport");
const passportSignIn = passport.authenticate("ngoInquiry-local-strategy", {
  session: false
});
const passportJWT = passport.authenticate("ngoInquiry-jwt-token", {
  session: false
});
const Ngo = models.ngo;
const Request1 = models.inquiry;
const NgoInquiry = models.ngoInquiry;

const UsersController = require("../controllers/users");

router.route("/signin").post(passportSignIn, UsersController.logIn);

router.route("/").post(passportJWT, async (req, res, next) => {
  try {
    var category = req.body.category;
    category = category.toLowerCase();
    console.log(category);
    var count = 0;

    const item = await Ngo.find({ category: category });
    console.log(item);

    for (i = 0; i < item.length; i++) {
      count = count + item[i].quantity;
    }
    console.log(count);

    res.json({ Available: count });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
