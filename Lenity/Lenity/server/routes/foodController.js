var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const router = require("express").Router();
const util = require("util");
const passportConf = require("../passport");
const passport = require("passport");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
var ObjectId = require("mongodb").ObjectID;
const models = require("../models/models");
const nodemailer = require("nodemailer");
var NodeGeocoder = require("node-geocoder");
// const passport = require('../config/passport');
const users = require("../routes/users");
const JSON = require("circular-json");
Profile = models.profile;
Food = models.food;
Item = models.item;
Executive = models.executive;
Restaurant = models.restaurant;
Coupon = models.coupon;

console.log("Za warudo");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "projectlenity365@gmail.com",
    pass: "lenity1234"
  }
});

var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE", // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

const couponid = function makeid() {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

router.get("/", (req, res, next) => {
  console.log("shgfamchfvc");
  res.render("Main page here");
});

// router.get("/search", passportJWT, async (req, res, next) => {
//   try {
//     // console.log("Getting search results");
//     console.log(req.body);
//     await models.item
//       .find({
//         category: req.body.category.toLowerCase(),
//         location: req.body.location.toLowerCase(),
//         confirmationStatus: 0
//       })
//       .then(async function(results) {
//         await results;
//         // console.log(results);
//         // res.render('search',{results:results});
//         // console.log('Results checking..');
//         // console.log(results);
//         res.json({ results: results });
//       });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/search", passportJWT, async (req, res, next) => {
  try {
    // console.log("Getting search results");
    console.log(req.body);
    if (req.body.location == "") {
      models.item
        .find({
          category: req.body.category.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..searchhh");
          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    } else if (req.body.category == "") {
      models.item
        .find({
          location: req.body.location.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..");
          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    } else {
      console.log("Here");
      models.item
        .find({
          category: req.body.category.toLowerCase(),
          location: req.body.location.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..");

          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", passportJWT, urlencodedParser, (req, res, next) => {
  try {
    // console.log('Query..');
    console.log(req.body);

    if (req.body.location == "") {
      models.item
        .find({
          category: req.body.category.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..//");
          // console.log(results);
          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    } else if (req.body.category == "") {
      models.item
        .find({
          location: req.body.location.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..");
          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    } else {
      models.item
        .find({
          category: req.body.category.toLowerCase(),
          location: req.body.location.toLowerCase(),
          confirmationStatus: 0
        })
        .then(async function (results) {
          await results;
          // res.render('search',{results:results});
          console.log("Results checking..");
          var search_results = [];
          for (var i = 0; i < results.length; i++) {
            // console.log(results[i].user, req.user.local.username);
            if (results[i].user !== req.user.local.username) {
              console.log("Removing users items");
              search_results.push(results[i]);
            }
          }
          console.log(search_results);

          res.json({ results: search_results });
        });
    }
  } catch (error) {
    next(error);
  }
});

// router.post("/", passportJWT, urlencodedParser, (req, res, next) => {
//   try {
//     // console.log('Query..');
//     console.log(req.body);
//     models.item
//       .find({
//         category: req.body.category.toLowerCase(),
//         location: req.body.location.toLowerCase(),
//         confirmationStatus: 0
//       })
//       .then(function(results) {
//         // res.render('search',{results:results});
//         console.log("Results checking..");
//         console.log(results);

//         res.json({ results: results });
//       });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/food", (req, res, next) => {
  res.render("food form here");
});

// router.route('/food').post( passportJWT , async (req, res, next) => {
//     try{
//     console.log('entered food page');
//     // console.log(req.body);
//     console.log('-------------');
//     await req.user;
//     name1 = req.body.donatedBy;
//     quantity1 = req.body.quantity;
//     location1 = req.body.location;
//     var food1 = new Food({
//         donatedBy: name1,
//         quantity: quantity1,
//         location: location1,
//         status: 0
//     });

//     await food1.save().then(async function(){
//         await Profile.findOne({'local.username':req.user.local.username}).then(async function(record){
//           console.log('print1');
//           // console.log(record);
//             await record.food.push(food1);
//             await record.save();

//         });

//     });

//     var pro1 = await Profile.findById(req.user.id);
//     console.log('print2');
//     // console.log(pro1);

//     res.json({ name: name1});
// }
// catch(error){
//     next(error);
//   }

// });
router.route("/food").post(passportJWT, async (req, res, next) => {
  try {
    console.log("entered food page");
    // console.log(req.body);
    console.log("-------------");
    await req.user;
    name1 = req.body.donatedBy;
    quantity1 = req.body.quantity;
    location1 = req.body.location;
    var food1 = new Food({
      donatedBy: name1,
      quantity: quantity1,
      location: location1,
      status: 0
    });

    await food1.save().then(async function () {
      await Profile.findOne({ "local.username": req.user.local.username }).then(
        async function (record) {
          console.log("print1");
          // console.log(record);
          await record.food.push(food1);
          await record.save();
        }
      );
    });

    if (quantity1 > 100) {
      var discount = null;
      if (quantity1 > 100 && quantity1 < 200) {
        discount = 10;
      } else if (quantity1 >= 200 && quantity1 < 300) {
        discount = 20;
      } else {
        discount = 30;
      }
      var coupon_code = couponid();
      var restaurant = await Restaurant.findOne({ location: location1 });
      if (!restaurant) {
        restaurant = await Restaurant.findOne({ name: "Lenity" });
      }
      console.log(restaurant);


      var coupon = new Coupon({
        code: coupon_code,
        restaurant: restaurant.name,
        location: restaurant.location,
        dis_per: discount
      });



      await coupon.save().then(async function () {
        await Profile.findOne({
          "local.username": req.user.local.username
        }).then(async function (record) {
          await record.coupon.push(coupon);
          await record.save();
        });
      });


      const html = `Hi ${req.user.local.username},
      You received a coupon of discount ${coupon.dis_per} in restaurant ${restaurant.name} at ${restaurant.location}.
      Coupon code : ${coupon_code}
    Have a great day.!!!!!`;

      const mailOptions = {
        from: "projectlenity365@gmail.com",
        to: req.user.local.email,
        subject: "Received coupon",
        text: html
      };

      await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent" + info.response);
        }
      });
    }



    var pro1 = await Profile.findById(req.user.id);
    console.log("print2");
    // console.log(pro1);

    res.json({ name: name1 });
  } catch (error) {
    next(error);
  }
});

//   router.get('/food-donate/:name',passportJWT ,async (req, res, next) => {
//           try{
//       console.log('entered food donate page');
//       console.log(req.params.name);
//       Food1 = Food.find({}).sort({$natural:-1})
//       await Food1;

//       var food1 = await Food1.findOne({'donatedBy': req.params.name}, async function(err, data){
//           if (err) throw err;
//           // await Executive.find({'location': req.params.location}, async function(err, result){
//           //     if (err) throw err;
//           console.log(data);
//           await Executive.findOne({'address': data.location.toLowerCase()}).then(async function(record){
//             if(record){
//               record.food.addToSet(data);
//               record.save();
//             }
//             else{
//               record =  await Executive.findOne({"address": "jaipur"});
//               record.food.addToSet(data);
//               record.save();
//             }
// //-----

// const html = `Hi, Executive ${record.name},
// You have been assigned to pick up the following food donated by:
//      ${data.donatedBy} at ${data.location}
//      quantity : ${data.quantity}
// Please reach there asap and confirm after successful delivery.
// Have a pleasant day!`;

//     const mailOptions = {
//       from: 'projectlenity365@gmail.com',
//       to: record.email,
//       subject: 'Delivery Notification',
//       text: html
//     };

//     await transporter.sendMail(mailOptions, function(error, info){
//       if(error) {
//         console.log(error);
//       } else {
//         console.log('Email sent' + info.response);
//       }

//     });
//     //--------
//               console.log(record);

//           console.log(data.location);

//           await req.user;
//           res.json({ donation:data, username:req.user.local.username, executive1: record });
//           });

//       });
//   }
//   catch(error){
//       next(error);
//   }
//   });

// router.get('/item', (req, res, next) => {
//     res.render("item");

// });

router.get("/food-donate/:name", passportJWT, async (req, res, next) => {
  try {
    console.log("entered food donate page");
    console.log(req.params.name);
    Food1 = Food.find({}).sort({ $natural: -1 });
    await Food1;

    var food1 = await Food1.findOne(
      { donatedBy: req.params.name },
      async function (err, data) {
        if (err) throw err;
        // await Executive.find({'location': req.params.location}, async function(err, result){
        //     if (err) throw err;
        console.log(data);
        //--------------assign executive here------------------

        var geocoder = NodeGeocoder(options);
        geocoder.geocode(data.location).then(async function (loc) {
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
              record = exes[0];
              await record;
              // console.log(record)
              // console.log('print record',record._id);
              if (record) {
                await Executive.findById(record._id).then(async function (exe1) {
                  console.log("finding id:", exe1);
                  exe1.food.addToSet(data);
                  exe1.save();
                });
              } else {
                exe1 = await Executive.findOne({ address: "sri city" });
                exe1.food.addToSet(data);
                exe1.save();
                record = exe1;
              }
              console.log(record.email);

              //---------send mail to exe---------------------
              const html = `Hi, Executive ${record.username},
You have been assigned to pick up the following food donated by:
   ${data.donatedBy} at ${data.location} 
   quantity : ${data.quantity}
Please reach there asap and confirm after successful delivery.
Have a pleasant day!`;

              const mailOptions = {
                from: "projectlenity365@gmail.com",
                to: record.email,
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
                donation: data,
                username: req.user.local.username,
                executive1: record
              });
            });
        });
      }
    );
    //-----------assigned---------
  } catch (error) {
    next(error);
  }
});

module.exports = router;
