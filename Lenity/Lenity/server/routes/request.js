const express = require("express");
const router = require("express-promise-router")();
const models = require("../models/models");
const passport = require("passport");
const passportConf = require("../passport");
const nodemailer = require("nodemailer");
var NodeGeocoder = require("node-geocoder");
const passportJWT = passport.authenticate("ngoInquiry-jwt-token", {
  session: false
});
//const Food = models.food;
//const Item = models.item;
Executive = models.executive;
const Ngo = models.ngo;
const Request1 = models.inquiry;
const NgoInquiry = models.ngoInquiry;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your email here",
    pass: "password"
  }
});

var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

router.route("/").post(passportJWT, async (req, res, next) => {
  try {
    console.log(req.body);
    var { name, location, category, quantity } = req.body;
    await category;
    console.log(category);
    category = category.toLowerCase();
    const newRequest = new Request1({
      name,
      location,
      category,
      quantity,
      status: false
    });
    await newRequest.save().then(async function () {
      await NgoInquiry.findById(req.user.id).then(async function (record) {
        await record.requests.push(newRequest);
        await record.save().then(async function () {
          //assigning executive
          var geocoder = NodeGeocoder(options);
          geocoder.geocode(newRequest.location).then(async function (loc) {
            Executive.aggregate()
              .near({
                near: {
                  type: "Point",
                  coordinates: [loc[0].longitude, loc[0].latitude]
                },
                maxDistance: 100000,
                spherical: true,
                distanceField: "dis"
              })
              .then(async function (exes) {
                record1 = exes[0];
                await record1;
                // console.log(record)
                // console.log('print record',record._id);
                if (record1) {
                  await Executive.findById(record1._id).then(async function (
                    exe1
                  ) {
                    console.log("finding id:", exe1);
                    exe1.ngoInquiry.addToSet(newRequest);
                    exe1.save();
                  });
                } else {
                  exe1 = await Executive.findOne({ address: "sri city" });
                  exe1.ngoInquiry.addToSet(newRequest);
                  exe1.save();
                  record1 = exe1;
                }
                console.log(record1.email);

                //---------send mail to exe---------------------
                const html = `Hi, Executive ${record1.username},
You have been assigned to pick up the following ngo request requested by:
   ${newRequest.name} at ${newRequest.location} 
   quantity : ${newRequest.quantity}
Please reach there asap and confirm after successful delivery.
Have a pleasant day!`;

                const mailOptions = {
                  from: "email",
                  to: record1.email,
                  subject: "Delivery Notification",
                  text: html
                };

                await transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent" + info.response);
                  }
                });

                //-----------------------------------
                await req.user;
                res.json({
                  request: newRequest,
                  executive1: record1
                });
              });
          });
          //-----------
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
