const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const models = require("../models/models");
const passportConf = require("../passport");
const passportSignIn = passport.authenticate("crop-local-strategy", {
  session: false
});
const passportJWT = passport.authenticate("crop-jwt-token", { session: false });
var bodyParser = require("body-parser");
var NodeGeocoder = require("node-geocoder");
StorageRequest = models.storageRequest;
Profile = models.profile;
Crop = models.crop;
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//const router = express.Router;
const UsersController = require("../controllers/users");

var GooglePlaces = require("google-places");

var places = new GooglePlaces("AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE");

router.route("/signin").post(passportSignIn, UsersController.logIn);

var options = {
  provider: "google",

  // Optional depending on the providers
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};
//Search reults
router
  .route("/")
  .get(passportJWT, async (req, res, next) => {
    var location = encodeURIComponent(req.query.location);
    var radius = 20000;
    var sensor = false;
    var types = "Cold Storage";
    var keyword = "cold storage";

    var key = "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE";
    var https = require("https");
    var geocoder = NodeGeocoder(options);

    geocoder.geocode(location).then(function(loc) {
      // console.log('loc..')
      // console.log(loc)
      var lat = loc[0].latitude;
      var long = loc[0].longitude;
      // var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&types=" + types;
      var url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
        lat +
        "," +
        long +
        "&radius=" +
        radius +
        "&type=" +
        types +
        "&keyword=" +
        keyword +
        "&key=" +
        key;
      // console.log(url);
      search_location = [loc[0].latitude, loc[0].longitude];
      https
        .get(url, function(response) {
          var body = "";
          response.on("data", function(chunk) {
            body += chunk;
          });

          response.on("end", function() {
            var places = JSON.parse(body);
            var locations = places.results;
            console.log(locations);
            storages = [];
            for (var i = 0; i < locations.length; i++) {
              console.log(locations[i].geometry.location);
              storages.push({
                name: locations[i].name + "," + locations[i].vicinity,
                lat: locations[i].geometry.location.lat,
                long: locations[i].geometry.location.lng
              });
            }
            console.log(storages);
            // console.log("search loc: ", search_location);
            res.json({ storages: storages, search_location: search_location });
          });
        })
        .on("error", function(e) {
          console.log("Got error: " + e.message);
        });
    });
  })
  .post(passportJWT, async (req, res, next) => {
    console.log(req.body);
    res.json({ storage: req.body.storage });
  });

router.route("/confirm").post(passportJWT, async (req, res, next) => {
  try {
    console.log(req.body);

    var geocoder = NodeGeocoder(options);
    var longitude;
    var latitude;
    geocoder.geocode(req.body.location).then(async function(loc) {
      console.log(loc);
      latitude = loc[0].latitude;
      longitude = loc[0].longitude;
      var strequest = new StorageRequest({
        name: req.body.name,
        location: req.body.location,
        cropType: req.body.cropType,
        geometry: {
          type: "point",
          coordinates: [longitude, latitude]
        },
        quantity: req.body.quantity,

        storage_location: req.body.storage,
        confirm_status: false,
        status: false
      });

      await strequest.save().then(async function() {
        await Crop.findOne({ _id: req.user.id }).then(async function(record) {
          // console.log("print1");
          // console.log(record);
          await record.storageRequest.push(strequest);
          await record.save();
          res.json(record);
        });
      });
    });
  } catch (error) {
    next(error);
  }
});

//Places API

// function(req, res){
//   var key = req.query.key;
//   var location = encodeURIComponent(req.query.location);
//   var radius = 16000;
//   var sensor = false;
//   var types = "restaurant";
//   var keyword = "fast";
//
//   var https = require('https');
//   var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + keyword;
//     console.log(url);
//   https.get(url, function(response) {
//     var body ='';
//     response.on('data', function(chunk) {
//       body += chunk;
//     });
//
//     response.on('end', function() {
//       var places = JSON.parse(body);
//       var locations = places.results;
//       // var randLoc = locations[Math.floor(Math.random() * locations.length)];
//       //
//       // res.json(randLoc);
//
//
//       console.log(places)
//     });
//   }).on('error', function(e) {
//     console.log("Got error: " + e.message);
//   });
// };

module.exports = router;
