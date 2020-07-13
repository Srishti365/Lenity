const mongoose = require("mongoose");
const models = require("../models/models");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressHandlebars = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

Profile = models.profile;
Food = models.food;
Item = models.item;
Executive = models.executive;
NGO = models.ngo;
Request = models.inquiry;
Crop = models.crop;
Truckex = models.truckprofile;
Restaurant = models.restaurant;
Coupon = models.coupon;
NgoInquiry = models.ngoInquiry;

require("../passport");

// var ngo1 = new Request({
//   category: 'books',
//     address: 'agra',
//     name: 'vasu',
//     quantity: 2
// });
//  ngo1.save();

//  var ngo2 = new NGO({
//     category: 'clothes',
//       location: 'agra',
//       donatedBy: 'vasu',
//       quantity: 5,
//       status:false,
//   });
//    ngo2.save();

// -------------------uncomment
// var exe1 = new Truckex({
//   username: "srishti",
//   email: "srishti.e17@iiits.in",
//   password: "root1234",
//   location: "Patna"
// });
// exe1.save();
//------------------------------
// var exe2 = new Executive({
//     username : "chethna",
//     contact : 9586412578.0,
//     email : "mendonchethna@gmail.com",
//     password : "root1234",
//     address : "Arambakkam",
//     geometry : {
//         "type" : "point",
//         "coordinates" : [
//             80.0690056,
//             13.5426818
//         ]
//     },
//     food : [],
//     item : [],
//     ngo: []
// })
// exe2.save();
//----------------------------new crop
// var crop1 = new Crop({
//     name: 'farmer1',
//     location: 'sri city',
//     quantity: 78,

//     storage_location: 'chennai'
// });
// crop1.save();

//-------------------------
// var pro1 = new Profile({
//     name: 'sssg',
//     email: 'sdfs',
//     contact: 344,
//     food: [food1],
//     item: [item1]
// });
// pro1.save();

//-------------------
// var res1 = new Restaurant({
//   name: "Taj",
//   email: "srishti.e17@iiits.in",
//   password: "root1234",
//   location: "chennai"
// });
// res1.save();

//NgO Login-------------------

// var ngo1 = new NgoInquiry({
//   name: "Help India",
//   email: "mendonchethna@gmail.com",
//   password: "root1234"
// });
// ngo1.save();
//ES6 PROMISES
mongoose.Promise = global.Promise;

//connect to db
mongoose.connect("mongodb://localhost/lenity", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection
  .once("open", function() {
    console.log("connection has been made, now make fireworks 1 2 3...");
  })
  .on("error", function(error) {
    console.log("Connection error: ", error);
  });
