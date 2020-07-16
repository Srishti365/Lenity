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
// var itemController = require('./itemController');
Profile = models.profile;
Food = models.food;
Item = models.item;
Executive = models.executive;
Request = models.request;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your email here",
    pass: "lpassword"
  }
});

var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyDU_kJ3UUPCV-HLOaTfDf9zfqBBAXQ0VHE",
  formatter: null // 'gpx', 'string', ...
};

router.get("/", (req, res, next) => {
  res.json("Item donate form here");
});

// Item donation form post method
router.post("/", passportJWT, urlencodedParser, async (req, res, next) => {
  try {
    console.log("entered item page");
    console.log(req.body);
    console.log("-------------");
    await req.user;
    // console.log(req.user);
    //name1 = req.body.donatedBy;
    category1 = req.body.category;
    quantity1 = req.body.quantity;
    location1 = req.body.address;
    description1 = req.body.description;
    age1 = req.body.age;
    // delivery_location1 = req.body.delivery_location;

    var item1 = new Item({
      donatedBy: req.user.local.username,
      user: req.user.local.username,
      category: category1,
      location: location1,
      description: description1,
      quantity: quantity1,
      age: age1,
      // delivery_location: delivery_location1,
      confirmationStatus: 0,
      status: 0
    });

    await item1.save().then(async function () {
      await Profile.findOne({ "local.username": req.user.local.username }).then(
        async function (record) {
          await record.item.push(item1);
          await record.save();
        }
      );
    });

    var pro1 = await Profile.findById(req.user.id);
    console.log(pro1);
    res.json({ profile1: pro1 });
  } catch (error) {
    next(error);
  }
});

// router.get('/item-donate/:name',passportJWT, async (req, res, next) => {
//     try{
//     console.log('entered item donate page');
//     await req.params.name;
//     console.log(req.params.name);
//     Item1 = Item.find({}).sort({$natural:-1})

//     var item1=await Item1.findOne({'donatedBy': req.params.name}, async function(err, data){
//         if (err) throw err;
//         await Executive.findOne({'address': data.location.toLowerCase()}).then(async function(record){
//           if(record){
//             record.item.addToSet(data);
//             record.save();
//           }
//           else{
//             record =  await Executive.findOne({"address": "jaipur"});
//             record.item.addToSet(data);
//             record.save();
//           }
// //-----

// const html = `Hi, Executive ${record.name},
// You have been assigned to pick up the ${data.category} donated by:
//      ${data.donatedBy} at ${data.location}
//      description: ${data.description}
//      quantity : ${data.quantity}
//      delivery location: ${data.delivery_location}
// Please reach there asap and confirm after successful delivery.
// Have a pleasant day!`;

//     const mailOptions = {
//       from: '',
//       to: record.email,
//       subject: 'Delivery notification',
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
//             console.log(record);
//         console.log(data.location);
//         await req.user;
//         res.json({ donation:data, username:req.user.local.username, executive1: record });
//     });

// });
//     }
//     catch(error){
//         next(error);
//       }

// });

// Requesting item
router.post(
  "/item-details",
  passportJWT,
  urlencodedParser,
  async (req, res, next) => {
    try {
      var id = req.body.id;
      console.log(id);
      await Item.find({ _id: id }).then(async function (record) {
        await record;
        console.log("Requesting this item..");
        console.log(record);
        await Request.findOne({ requestor: req.user.local.username }).then(
          async function (result) {
            var bool = false;
            if (!result) {
              var newRequest = new Request({
                requestor: req.user.local.username,
                itemRequested: record
              });
              newRequest.save();
              console.log("Saved ! Yay !");
              res.json(newRequest);
            } else {
              for (var i = 0; i < result.itemRequested.length; i++) {
                if (
                  JSON.stringify(record) ===
                  JSON.stringify(result.itemRequested[i])
                ) {
                  console.log("Bool===true");
                  console.log(result.itemRequested[i]);
                  bool = true;
                  break;
                }
              }
              if (bool === false) {
                // You haven't requested this item

                result.itemRequested.push(record[0]);
                result.save();
                res.json(result);
                console.log("Request sent successfully !");
              } else {
                console.log(
                  "You have already requested this item..wait for the results !"
                );
              }
            }

            // res.json("OK");
          }
        );
      });
    } catch (error) {
      next(error);
    }
  }
);

//Fetching item details
router.route("/item-details").get(passportJWT, async (req, res, next) => {
  // console.log('Here...');
  try {
    var id = req.query.id;
    // console.log(id);
    console.log("Fetching this item's details");
    Item.findOne({ _id: id }).then(async function (record) {
      await record;
      console.log(record);

      Request.findOne({ requestor: req.user.local.username }).then(
        async function (result) {
          await result;
          // console.log('Javascript sucks');
          // console.log(result);
          var bool = false;
          if (result) {
            for (var i = 0; i < result.itemRequested.length; i++) {
              if (
                JSON.stringify(record) ===
                JSON.stringify(result.itemRequested[i])
              ) {
                bool = true;
                break;
              }
            }
          }
          // console.log(bool);

          if (result && bool) {
            console.log("You've already requested this item");
            // res.render('itemDetails',{donation:record,requested:true});
            res.json({ donation: record, requested: true });
          } else {
            console.log("You can request this item");

            // res.render('itemDetails',{donation:record,requested:false});
            res.json({ donation: record, requested: false });
          }
        }
      );
    });
  } catch (error) {
    next(error);
  }
});

//View received item requests
// router.get("/requests", passportJWT, async (req, res, next) => {
//   // console.log(req.body);
//   try {
//     Request.find({}).then(async function(result) {
//       await result;
//       received_requests = {
//         pending: [],
//         deliveryConfirmed: [],
//         deliveryNotConfirmed: []
//       };
//       // console.log(result[0])
//       for (var i = 0; i < result.length; i++) {
//         await result[i].itemRequested;
//         // if (result[i].itemRequested.length > 0) {
//         for (var j = 0; j < result[i].itemRequested.length; j++) {
//           console.log(result[i].itemRequested[j].user);
//           if (result[i].itemRequested[j].user == req.user.local.username) {
//             if (result[i].itemRequested[j].confirmationStatus === 0) {
//               received_requests["pending"].push({
//                 requestor: result[i].requestor,
//                 item: result[i].itemRequested[j]
//               });
//             } else if (result[i].itemRequested[j].confirmationStatus === 1) {
//               received_requests["deliveryNotConfirmed"].push({
//                 requestor: result[i].requestor,
//                 item: result[i].itemRequested[j]
//               });
//             } else if (result[i].itemRequested[j].confirmationStatus === 2) {
//               received_requests["deliveryConfirmed"].push({
//                 requestor: result[i].requestor,
//                 item: result[i].itemRequested[j]
//               });
//             }
//           }
//         }
//         // } else {
//         //   res.json("No requests to show");
//         // }
//       }
//       console.log("Received requests");
//       console.log(received_requests);
//       res.json(received_requests);
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/requests", passportJWT, async (req, res, next) => {
  // console.log(req.body);
  try {
    var accepted_requests = [];
    var received_requests = [];

    Request.find({}).then(async function (result) {
      await result;

      //Accepted Requests
      for (var i = 0; i < result.length; i++) {
        if (result[i].requestor == req.user.local.username) {
          for (var j = 0; j < result[i].itemRequested.length; j++) {
            if (result[i].itemRequested[j].confirmationStatus == 1) {
              accepted_requests.push({
                requestor: req.user.local.username,
                item: result[i].itemRequested[j]
              });
            }
          }
        }
      }

      //Received requests

      for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].itemRequested.length; j++) {
          if (
            result[i].itemRequested[j].user == req.user.local.username &&
            result[i].itemRequested[j].confirmationStatus == 0
          ) {
            received_requests.push({
              requestor: result[i].requestor,
              item: result[i].itemRequested[j]
            });
          }
        }
      }

      res.json({
        accepted_requests: accepted_requests,
        received_requests: received_requests
      });
    });
  } catch (error) {
    next(error);
  }
});

router.post("/requests", passportJWT, async (req, res, next) => {
  console.log(req.body);
  try {
    var concat_vals = req.body.concat_vals;
    vars = concat_vals.split("|");
    console.log("vars", vars);
    var id = vars[0];
    var requestor = vars[1];
    var type = vars[2];

    Request.find({}).then(async function (result) {
      await result;
      flag = false;
      if (type == "acc") {
        for (var i = 0; i < result.length; i++) {
          if (result[i].requestor == requestor) {
            for (var j = 0; j < result[i].itemRequested.length; j++) {
              if (
                result[i].itemRequested[j]._id == id &&
                result[i].itemRequested[j].user == req.user.local.username
              ) {
                result[i].itemRequested[j].confirmationStatus = 1;
                await result[i].save();
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        }
        Item.findOne({ _id: id }).then(async function (record) {
          await record;
          record.confirmationStatus = 1;
          await record.save();
        });

        for (var i = 0; i < result.length; i++) {
          if (result[i].requestor != requestor) {
            for (var j = 0; j < result[i].itemRequested.length; j++) {
              // console.log(result[i].requestor);
              // console.log(result[i].itemRequested[j]);
              if (result[i].itemRequested[j]._id == id) {
                console.log("Here splicing...");

                result[i].itemRequested.splice(j, 1);
                await result[i].save();
                // break;
              }
            }
          }
        }

        res.json("Success");
      } else {
        // call pay function
        var exe_details = {};
        flag = false;
        Item.findOne({ _id: id }).then(async function (record) {
          await record;
          record.confirmationStatus = 2;
          await record.save();
        });

        for (var i = 0; i < result.length; i++) {
          if (result[i].requestor == req.user.local.username) {
            for (var j = 0; j < result[i].itemRequested.length; j++) {
              if (result[i].itemRequested[j]._id == id) {
                result[i].itemRequested[j].confirmationStatus = 2;
                await result[i].save();

                ////Mail executive

                await Item.findById(id).then(async function (data) {
                  await data;
                  //------------------assign executive
                  var geocoder = NodeGeocoder(options);
                  geocoder.geocode(data.location).then(async function (loc) {
                    Executive.aggregate()
                      .near({
                        near: {
                          type: "Point",
                          coordinates: [loc[0].longitude, loc[0].latitude]
                        },
                        maxDistance: 1000000000,
                        spherical: true,
                        distanceField: "dis"
                      })
                      .then(async function (exes) {
                        record = exes[0];
                        await record;
                        // console.log(record)
                        // console.log('print record',record._id);
                        if (record) {
                          await Executive.findById(record._id).then(
                            async function (exe1) {
                              console.log("finding id:", exe1);
                              exe1.item.addToSet(data);
                              exe1.save();
                            }
                          );
                        } else {
                          exe1 = await Executive.findOne({
                            address: "sri city"
                          });
                          exe1.item.addToSet(data);
                          exe1.save();
                          record = exe1;
                        }
                        console.log(record);
                        exe_details = record;

                        //---------send mail to exe---------------------
                        const html = `Hi, Executive ${record.username},
You have been assigned to pick up the ${data.category} donated by:
${data.user} at ${data.location}
quantity : ${data.quantity}
Please reach there asap and confirm after successful delivery.
Have a pleasant day!`;

                        const mailOptions = {
                          from: "email",
                          to: record.email,
                          subject: "Delivery Notification",
                          text: html
                        };

                        await transporter.sendMail(mailOptions, function (
                          error,
                          info
                        ) {
                          if (error) {
                            console.log(error);
                          } else {
                            console.log("Email sent" + info.response);
                          }
                        });
                      });
                  });
                });

                ////////
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        }
        console.log(exe_details);
        res.json(exe_details);
      }
    });
  } catch (error) {
    next(error);
  }
});

// router.post("/requests", passportJWT, async (req, res, next) => {
//   // console.log(req.body);
//   try {
//     Request.find({}).then(async function(result) {
//       await result;
//       // received_requests = {"pending":[],"deliveryConfirmed":[],"deliveryNotConfirmed":[]}
//       // console.log(result[0])
//       console.log("Updated requests");

//       var item_id = req.body.id;
//       var requestor = req.body.requestor;
//       var confirm = "False";
//       var delivery = "False";
//       if (typeof req.body.confirm !== "undefined") {
//         confirm = req.body.confirm;
//       }
//       if (typeof req.body.delivery !== "undefined") {
//         delivery = req.body.delivery;
//       }
//       i_flag = false;
//       j_flag = false;

//       for (var i = 0; i < result.length; i++) {
//         for (var j = 0; j < result[i].itemRequested.length; j++) {
//           console.log("-----");
//           if (
//             result[i].requestor === requestor &&
//             result[i].itemRequested[j]._id == item_id
//           ) {
//             if (delivery === "True") {
//               console.log("Delivering..");
//               result[i].itemRequested[j].confirmationStatus = 2;
//               await result[i].save();

//               await Item.findById(item_id).then(async function(data) {
//                 await data;
//                 //------------------assign executive
//                 var geocoder = NodeGeocoder(options);
//                 geocoder.geocode(data.location).then(async function(loc) {
//                   Executive.aggregate()
//                     .near({
//                       near: {
//                         type: "Point",
//                         coordinates: [loc[0].longitude, loc[0].latitude]
//                       },
//                       maxDistance: 1000000000,
//                       spherical: true,
//                       distanceField: "dis"
//                     })
//                     .then(async function(exes) {
//                       record = exes[0];
//                       await record;
//                       // console.log(record)
//                       // console.log('print record',record._id);
//                       if (record) {
//                         await Executive.findById(record._id).then(
//                           async function(exe1) {
//                             console.log("finding id:", exe1);
//                             exe1.item.addToSet(data);
//                             exe1.save();
//                           }
//                         );
//                       } else {
//                         exe1 = await Executive.findOne({ address: "sri city" });
//                         exe1.item.addToSet(data);
//                         exe1.save();
//                         record = exe1;
//                       }
//                       console.log(record);

//                       //---------send mail to exe---------------------
//                       const html = `Hi, Executive ${record.username},
// You have been assigned to pick up the ${data.category} donated by:
// ${data.user} at ${data.location}
// quantity : ${data.quantity}
// Please reach there asap and confirm after successful delivery.
// Have a pleasant day!`;

//                       const mailOptions = {
//                         from: "",
//                         to: record.email,
//                         subject: "Delivery Notification",
//                         text: html
//                       };

//                       await transporter.sendMail(mailOptions, function(
//                         error,
//                         info
//                       ) {
//                         if (error) {
//                           console.log(error);
//                         } else {
//                           console.log("Email sent" + info.response);
//                         }
//                       });

//                       //-----------------------------------
//                     });
//                 });
//               });

//               //------------------------------------
//               res.json({
//                 requestor: requestor,
//                 item: result[i].itemRequested[j]
//               });

//               i_flag = true;
//               j_flag = true;
//             }
//             else if (confirm === "True") {
//               console.log("Confirming..");
//               result[i].itemRequested[j].confirmationStatus = 1;
//               await result[i].save();

//               res.json({
//                 requestor: requestor,
//                 item: result[i].itemRequested[j]
//               });
//               i_flag = true;
//               j_flag = true;
//             }
//           }
//           if (j_flag) {
//             break;
//           }
//         }
//         if (i_flag) {
//           break;
//         }
//       }

//       if (i_flag && j_flag) {
//         console.log("here..in splicing");
//         for (var i = 0; i < result.length; i++) {
//           for (var j = 0; j < result[i].itemRequested.length; j++) {
//             console.log(result[i].requestor);
//             console.log(result[i].itemRequested[j]);
//             if (
//               result[i].requestor != requestor &&
//               result[i].itemRequested[j]._id == item_id
//             ) {
//               console.log("Here splicing...");

//               result[i].itemRequested.splice(j, 1);
//               result[i].save();
//               // break;
//             }
//           }
//         }
//       }

//       // }
//       // console.log(received_requests);
//       // res.json(received_reque1sts);
//       // });
//     });
//   } catch (error) {
//     // next(error)
//     console.log("Error", error);
//   }
// });

router.get("/delivery", passportJWT, async (req, res, next) => {
  try {
    var id = req.query.id;
    // console.log(id);
    console.log("Fetching this item's details");
    Item.findOne({ _id: id }).then(async function (record) {
      await record;
      console.log(record);
      // res.render('delivery',{itemId:id});
      res.json({ itemId: id });
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/delivery",
  passportJWT,
  urlencodedParser,
  async (req, res, next) => {
    try {
      console.log("Data received");
      console.log(req.body);
      // console.log(req.params);

      var id = req.body.id;
      console.log(req.user.local.username);
      // var deliveryAddress = req.query.
      // await Request.findOne({'requestor': req.user.username}, async function(record){
      await Request.findOne({ requestor: req.user.local.username }).then(
        async function (record) {
          await record;
          console.log(record);
          for (var i = 0; i < record.itemRequested.length; i++) {
            if (record.itemRequested[i]._id == id) {
              record.itemRequested[i].confirmationStatus = 2;
              record.save();
              res.json(record);
              // console.log('Fixing things up !');
              break;
            }
          }
        }
      );
      var item1 = await Item.findOne({ _id: id }, async function (err, data) {
        if (err) throw err;
        data.confirmationStatus = 2;
        data.save();
        console.log("Setting conf.. to 2");
        console.log(data);
        await Executive.findOne({ address: "sri city" }).then(async function (
          record
        ) {
          await record;
          console.log(record);
          record.item.addToSet(data);
          record.save();
          //-----}
          // res.json(record);

          const html = `Hi, Executive ${record.name},
    You have been assigned to pick up the ${data.category} donated by:
     ${data.donatedBy} at ${data.location}
     description: ${data.description}
     quantity : ${data.quantity}
    Please reach there asap and confirm after successful delivery.
    Have a pleasant day!`;

          const mailOptions = {
            from: "email",
            to: record.email,
            subject: "Delivery notification",
            text: html
          };

          await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent" + info.response);
            }
          });

          // console.log(record);
          // console.log(data.location);
          await req.user.local.username;
          res.json(data);
          // res.render('item-donate', { donation:data, username:req.user.username, executive1: record });
        });
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
