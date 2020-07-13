const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConf = require("../passport");
var ObjectId = require("mongodb").ObjectID;
const passportSignIn = passport.authenticate("truck-local-strategy", {
  session: false
});
const passportJWT = passport.authenticate("truck-jwt-token", {
  session: false
});
var bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const models = require("../models/models");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
Crop = models.crop;
StorageRequest = models.storageRequest;
Truck_agent = models.truckprofile;
var NodeGeocoder = require("node-geocoder");
//const router = express.Router;
const UsersController = require("../controllers/users");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "projectlenity365@gmail.com",
    pass: "lenity1234"
  }
});

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

router.route("/signin").post(passportSignIn, UsersController.logIn);

router.route("/").get(passportJWT, async (req, res, next) => {
  try {
    console.log("trucking agency page");
    await req.user;
    //console.log(req.user);
    var geocoder = NodeGeocoder(options);
    geocoder.geocode(req.user.location).then(async function(loc) {
      console.log(loc);
      await Crop;
      StorageRequest.aggregate()
        .near({
          near: {
            type: "Point",
            coordinates: [loc[0].longitude, loc[0].latitude]
          },
          maxDistance: 10000000000000000,
          spherical: true,
          distanceField: "dis"
        })
        .then(function(crops) {
          res.json({ truck_agent: req.user, truck_data: crops });
        });
    });
  } catch (error) {
    next(error);
  }
});

router.route("/").post(passportJWT, async (req, res, next) => {
  try {
    console.log(req.body); //this will have id of the storageRequest
    await StorageRequest.findById(req.body.id).then(async function(record) {
      await Crop.findOne({ "storageRequest._id": req.body.id }).then(
        async function(data) {
          res.json({ details: record, email: data.email });
        }
      );
      //res.json({ details: record });
    });
  } catch (error) {
    next(error);
  }
});

router.route("/view_route").post(passportJWT, async (req, res, next) => {
  try {
    console.log("print body", req.body); //this will have id of the storageRequest
    await req.body;
    var geocoder = NodeGeocoder(options);
    await StorageRequest.findById(req.body.id).then(async function(record) {
      //record.location   //res.user.location
      geocoder.geocode(req.user.location).then(async function(loc) {
        lat_truck = loc[0].latitude;
        long_truck = loc[0].longitude;
        await lat_truck;
        await long_truck;
        geocoder.geocode(record.location).then(async function(loc1) {
          console.log("location", loc1);
          lat_stor = loc1[0].latitude;
          long_stor = loc1[0].longitude;
          await lat_stor;
          await long_stor;
          res.json({
            lat_stor: lat_stor,
            long_stor: long_stor,
            lat_truck: lat_truck,
            long_truck: long_truck
          });
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

router
  .route("/view_deliveryroute")
  .post(passportJWT, async (req, res, next) => {
    try {
      console.log(req.body); //this will have id of the storageRequest
      await req.body;
      var geocoder = NodeGeocoder(options);
      await StorageRequest.findById(req.body.id).then(async function(record) {
        //record.location   //res.user.location
        geocoder.geocode(record.storage_location).then(async function(loc) {
          console.log(record);

          await loc;
          console.log("print", loc);
          lat_storage = loc[0].latitude;
          long_storage = loc[0].longitude;
          await lat_storage;
          await long_storage;
          geocoder.geocode(record.location).then(async function(loc1) {
            await loc1;
            lat_farm = loc1[0].latitude;
            long_farm = loc1[0].longitude;
            await lat_farm;
            await long_farm;
            res.json({
              lat_farm: lat_farm,
              long_farm: long_farm,
              lat_storage: lat_storage,
              long_storage: long_storage
            });
          });
        });
      });
    } catch (error) {
      next(error);
    }
  });

router.route("/confirm_pickup").post(passportJWT, async (req, res, next) => {
  try {
    console.log("confirming pickup");
    await req.user;
    await req.body; //this will have id of storage request
    console.log(req.body);
    StorageRequest.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { confirm_status: true } },
      async function(err, record) {
        if (err) throw err;
        await record.save;
        console.log("printtttt");
        await Crop.findOneAndUpdate(
          { "storageRequest._id": req.body.id },
          { $set: { "storageRequest.$.confirm_status": true } },
          async function(err2, data) {
            if (err2) throw err2;
            console.log("printing...", data);
            //-------------------------mail--------------

            const html = `Hi, ${record.name}
        The trucking agent ${req.user.username} will arrive soon  to pick up your crop
        Thank you for your contribution!`;

            const mailOptions = {
              from: "projectlenity365@gmail.com",
              to: data.email,
              subject: "Crop pick up confirmed",
              text: html
            };

            await transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent" + info.response);
              }
            });
            await StorageRequest.findById(req.body.id).then(async function(
              order
            ) {
              console.log(order);
              await Truck_agent.findById(req.user.id).then(async function(
                agent
              ) {
                await agent.deliveries.push(order);
                await agent.save();
              });
            });
            res.json({ truck_agent: req.user, details: data });
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
});

router.route("/pending").get(passportJWT, async (req, res, next) => {
  try {
    // await Truck_agent.findOne({"_id":req.user.id}).then(async function(record) {
    //   res.json(record);
    // });
    var pending_data = await Truck_agent.aggregate([
      { $match: { _id: ObjectId(req.user.id) } },
      {
        $redact: {
          $cond: [
            { $eq: [{ $ifNull: ["$confirm_status", true] }, true] },
            "$$DESCEND",
            "$$PRUNE"
          ]
        }
      },
      { $project: { deliveries: 1, _id: 0 } }
    ]);
    res.json(pending_data[0]);
  } catch (error) {
    next(error);
  }
});

router.route("/pending").post(passportJWT, async (req, res, next) => {
  try {
    console.log("confirming deliveryy");
    await req.user;
    await req.body; //this will have id of storage request
    console.log(req.body);
    await StorageRequest.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { status: true } },
      async function(err, record) {
        if (err) throw err;
        await record.save;
        await Crop.findOneAndUpdate(
          { "storageRequest._id": req.body.id },
          { $set: { "storageRequest.$.status": true } },
          async function(err2, data) {
            if (err2) throw err2;
            //-------------------------mail--------------

            const html = `Hi, ${record.name} from ${record.location}
        The crop that you donated has successfully been delivered by the trucking agent ${req.user.username}!
        Thank you for your contribution!`;

            const mailOptions = {
              from: "projectlenity365@gmail.com",
              to: data.email,
              subject: "Crop delivery done",
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

            await Truck_agent.findOneAndUpdate(
              { "deliveries._id": req.body.id },
              { $set: { "deliveries.$.status": true } },
              async function(err3, agent) {
                if (err3) throw err3;
                res.json({ truck_agent: agent });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    next(error);
  }
});

//--------------------------creating new crop
// var geocoder = NodeGeocoder(options);
// var longitude;
// var latitude;
// geocoder.geocode('patna')
//   .then(function (loc) {
//     console.log(loc);
//     latitude = loc[0].latitude
//     longitude = loc[0].longitude
//     var crop1 = new Crop({
//       name: 'farmer4',
//       location: 'patna',
//       geometry: {
//         "type": "point",
//         "coordinates": [
//           longitude,
//           latitude
//         ]
//       },
//       quantity: 45,
//       email:"srishti.e17@iiits.in",
//       password:"root1234",
//       storage_location: 'patna',
//       status: false
//     });
//     crop1.save();

//   })

module.exports = router;
