const express = require("express");
const router = express.Router();

const passport = require("passport");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const util = require("util");
var ObjectId = require("mongodb").ObjectID;
const models = require("../models/models");
const nodemailer = require("nodemailer");
const users = require("../routes/users");
const JSON = require("circular-json");
const passportSignIn = passport.authenticate("ex-local-strategy", {
  session: false
});
const passportJWT = passport.authenticate("ex-jwt-token", { session: false });
const { validateBody, signInSchema } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");

Profile = models.profile;
Food = models.food;
Item = models.item;
Executive = models.executive;
NGO = models.ngo;
RequestInquiry = models.inquiry;
NgoInquiry = models.ngoInquiry;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "projectlenity365@gmail.com",
    pass: "lenity1234"
  }
});

router
  .route("/signin")
  .post(
    validateBody(signInSchema.authSchema),
    passportSignIn,
    UsersController.logIn
  );

router
  .route("/login")
  .get((req, res) => {
    res.render("executiveLogin");
  })
  .post(
    passport.authenticate("local-executive", {
      successRedirect: "/executive/dashboard",
      failureRedirect: "/executive/executivelogin",
      failureFlash: true
    })
  );

router
  .route("/dashboard")
  .get(passportJWT, async (req, res, next) => {
    try {
      await req.user;
      var executive_data = await Executive.findById(req.user.id);
      console.log("printing executives data");
      res.json({ executive_data: executive_data });
    } catch (error) {
      next(error);
    }
  })
  .post(passportJWT, async (req, res, next) => {
    try {
      var concat_vals = req.body.concat_vals;
      vars = concat_vals.split("|");
      console.log("vars", vars);
      var id = vars[0];

      var type = vars[1];

      console.log("confirming delivery");
      console.log("-------------");
      console.log(req.body);
      await req.body;
      await req.user;

      if (type == "food") {
        await Food.findOneAndUpdate(
          { _id: id },
          { $set: { status: true } },
          async function(err, record) {
            if (err) throw err;
            record.save;
            console.log("update food");
            console.log(record);
          }
        );
        await Profile.findOneAndUpdate(
          { "food._id": id },
          { $set: { "food.$.status": true } },
          async function(err2, prodata) {
            if (err2) throw err2;
            prodata.save();
            console.log("update users food");
            //-------------------------mail--------------

            const html = `Hi, ${prodata.local.username},
  The food that you donated has successfully been delivered!
  Thank you for your contribution!`;

            const mailOptions = {
              from: "projectlenity365@gmail.com",
              to: prodata.local.email,
              subject: "Food delivery done",
              text: html
            };

            await transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent" + info.response);
              }
            });
            //--------------------------
          }
        );
        console.log("printing req.user.id");
        console.log(req.user.id);
        await Executive.findOneAndUpdate(
          { _id: req.user.id, "food._id": id },
          { $set: { "food.$.status": true } },
          async function(err1, exedata) {
            if (err1) throw err1;
            await exedata;
            exedata.save();
            console.log("update executives food");
            finaldata = await Executive.findOne({
              _id: req.user.id,
              "food._id": id
            });
            res.json({ executive_data: finaldata });
          }
        );
      }

      if (type == "item") {
        console.log("item update");
        Item.findOneAndUpdate(
          { _id: id },
          { $set: { status: true } },
          async function(err, record) {
            if (err) throw err;
            await record;
            record.save;
            console.log("updated item");
            console.log(record);
            // res.json(record);
          }
        );
        Profile.findOneAndUpdate(
          { "item._id": id },
          { $set: { "item.$.status": true } },
          async function(err2, prodata) {
            if (err2) throw err2;
            await prodata;
            prodata.save();
            console.log("update users food");
            console.log(prodata);

            const html = `Hi, ${prodata.local.firstname},
      The item that you donated has successfully been delivered!
      Thank you for your contribution!`;

            const mailOptions = {
              from: "projectlenity365@gmail.com",
              to: prodata.local.email,
              subject: "Your item has been delivered",
              text: html
            };

            await transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent" + info.response);
              }
            });
            //--
            console.log(prodata);
          }
        );
        Executive.findOneAndUpdate(
          { _id: req.user.id, "item._id": id },
          { $set: { "item.$.status": true } },
          async function(err1, exedata) {
            if (err1) throw err1;
            exedata.save();
            console.log("update executives food");
            finaldata = await Executive.findOne({
              _id: req.user.id,
              "item._id": id
            });
            // console.log(exedata);
            res.json({ executive_data: finaldata });
          }
        );
      }

      //--------------------ngo pickup confirm-------------
      if (type == "ngo") {
        console.log("ngo update");
        NGO.findOneAndUpdate(
          { _id: id },
          { $set: { status: true } },
          async function(err, record) {
            if (err) throw err;
            record.save;
            console.log("updated ngo donation");
            console.log(record);
            // res.json(record);

            var pro1 = await Profile.findById(record.user);
            console.log(pro1.local.email);

            const html = `Hi, ${pro1.local.username},
      Your donation has successfully been delivered to the ngo!
      Thank you for your contribution!`;

            const mailOptions = {
              from: "projectlenity365@gmail.com",
              to: pro1.local.email,
              subject: "Your donation to the  has been delivered",
              text: html
            };

            await transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent" + info.response);
              }
            });
            //--
          }
        );

        Executive.findOneAndUpdate(
          { _id: req.user.id, "ngo._id": id },
          { $set: { "ngo.$.status": true } },
          async function(err1, exedata) {
            if (err1) throw err1;
            await exedata;
            await exedata.save();
            console.log("update executives food");
            finaldata = await Executive.findOne({
              _id: req.user.id,
              "ngo._id": id
            });
            // console.log(exedata);
            res.json({ executive_data: finaldata });
          }
        );
      }

      //---------------------------------------------------

      //--------------------ngo inquiry pickup confirm----------------
      if (type == "ngoinquiry") {
        await RequestInquiry.findOneAndUpdate(
          { _id: id },
          { $set: { status: true } },
          async function(err, record) {
            if (err) throw err;
            record.save;
            console.log("update ngos request");
            console.log(record);
            //----ngotable update
            await NgoInquiry.findOneAndUpdate(
              { "requests._id": id },
              { $set: { "requests.$.status": true } },
              async function(err2, prodata) {
                if (err2) throw err2;
                prodata.save();
                console.log("update ngo inquiry table");
                //-------------------------mail--------------

                const html = `Hi, ${record.name},
  The request you made has for ${record.quantity} ${record.category} been delivered by our executive ${req.user.username}!
  Thank you for your contribution!`;

                const mailOptions = {
                  from: "projectlenity365@gmail.com",
                  to: prodata.email,
                  subject: "Request delivered",
                  text: html
                };

                await transporter.sendMail(mailOptions, function(error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent" + info.response);
                  }
                });
                //--------------------------
              }
            );

            //----
          }
        );
        //----update executive
        await Executive.findOneAndUpdate(
          { _id: req.user.id, "ngoInquiry._id": id },
          { $set: { "ngoInquiry.$.status": true } },
          async function(err1, exedata) {
            if (err1) throw err1;
            await exedata;
            exedata.save();
            console.log("update executives food");
            finaldata = await Executive.findOne({
              _id: req.user.id,
              "ngoInquiry._id": id
            });
            res.json({ executive_data: finaldata });
          }
        );

        //----
      }
      //--------------------------------------------------------------
    } catch (error) {
      next(error);
    }
  });

router.route("/delivered").get(passportJWT, async (req, res, next) => {
  try {
    await req.user;
    var executive_data = await Executive.findOne({ _id: req.user.id });
    console.log("exe", executive_data);

    var executive_data1 = await Executive.aggregate([
      { $match: { _id: ObjectId(req.user.id) } },
      {
        $redact: {
          $cond: [
            { $eq: [{ $ifNull: ["$status", true] }, true] },
            "$$DESCEND",
            "$$PRUNE"
          ]
        }
      },
      { $project: { food: 1, ngoInquiry: 1, item: 1, ngo: 1 } } //if require id put 1, else 0
    ]);

    res.json({ executive_data: executive_data1[0] });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
