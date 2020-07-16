const JWT = require("jsonwebtoken");

const models = require("../models/models");
User = models.profile;
Executive = models.executive;
const { JWT_SECRET } = require("../configuration");
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const passport = require("../passport");
const rn = require("random-number");

signToken = user => {
  return JWT.sign(
    {
      iss: "ProjectLenity",
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    JWT_SECRET
  );
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email",
    pass: "password"
  }
});

var gen = rn.generator({
  min: 100000,
  max: 999999,
  integer: true
});

module.exports = {
  signUp: async (req, res, next) => {
    const { username, email, password } = req.value.body;

    const foundUser = await User.findOne({ "local.email": email });
    if (foundUser) {
      return res.status(403).json({ error: "Email is already in use" });
    }

    const Username = await User.findOne({ "local.username": username });
    if (Username) {
      return res.status(403).json({ error: "Username already exists" });
    }

    const secretToken = gen();
    const hash = await models.hashPassword(password);

    const active = false;

    const newUser = new User({
      methods: "local",
      local: {
        username: username,

        email: email,
        password: hash,
        secretToken: secretToken,
        active: active
      }
    });

    // await newUser.save();
    // console.log(newUser);

    const html = `Hi there,
        Thank you for registering!!
        
        Please verify your email by typing the following token:
        Token:${secretToken}
        On the following page:
        http://localhost:3000/verify
        Have a pleasant day.`;

    const mailOptions = {
      from: "email",
      to: email,
      subject: "Please verify your email",
      text: html
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent" + info.response);
      }
    });

    // res.json({ user: 'created' });
    //Generate the token
    //const token = signToken(newUser);

    //Respond with token
    newUser
      .save()
      .then(user => {
        const payload = {
          id: user.id,
          name: user.local.username
        };
        // Sign token
        JWT.sign(
          payload,
          JWT_SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              req.io.sockets.emit("profiles", user.local.username);
              res.json({
                success: true,
                token: token,
                name: user.local.username
              });
            }
          }
        );
      })
      .catch(err => console.log(err));
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token,
      username: req.user.local.username,
      name: req.user.local.username
    });
    console.log("UserController.signIn() called");
    console.log("Successfull login!!!");
  },
  logIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ success: true, token: token });
    console.log("UserController.signIn() called");
    console.log("Successfull login!!!");
  },
  secret: async (req, res, next) => {
    console.log("I managed to get here!!!");
    res.json({ secret: "resource" });
  },
  googleOAuth: async (req, res, next) => {
    // Generate token
    console.log("req.user", req.user);
    const token = signToken(req.user);

    res.status(200).json({ token: token });
  },
  facebookOAuth: async (req, res, next) => {
    // Generate token
    console.log("got here");
  },
  verify: async (req, res, next) => {
    try {
      //var token = token;
      console.log("lalalaa");
      console.log(req.user);

      const { secretToken } = req.body;
      console.log(secretToken);
      const user = await User.findOne({ "local.secretToken": secretToken });
      console.log(user);
      if (!user) {
        return res.status(403).json({ error: "Invalid Token" });
      }

      user.local.active = true;
      user.local.secretToken = "";
      user.save();

      console.log("verified");
      return res.json({ token: "abc" });
    } catch (error) {
      next(error);
    }
  },
  forgetPassword: async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ "local.email": email });
    if (!user) {
      return res.status(403).json({ error: "Email does not exists" });
    }

    const html = `Hi, there,
    On the following page:
    http://localhost:5000/users/checkPassword?email=${email}
    Have a pleasant day!`;
    const mailOptions = {
      from: "email",
      to: email,
      subject: "Please verify your email",
      text: html
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent" + info.response);
      }
    });

    res.json({ success: true, Message: "Please check your email" });
  },
  confirmPassword: async (req, res, next) => {
    const password = req.value.body.password;
    const email = req.query.email;
    console.log(email);
    const hash = await models.hashPassword(password);
    await User.findOneAndUpdate(
      { "local.email": email },
      {
        $set: { "local.password": hash }
      },
      function (err, res) {
        if (err) throw err;
      }
    );
    res.json({ Message: "Password updated" });
  },
  editProfile: async (req, res, next) => {
    const { firstname, lastname, contactno, address } = req.value.body;
    User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          address: address,
          contactno: contactno
        }
      },
      function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      }
    );
    res.json({ Message: "Profile Updated" });
  },
  profile: async (req, res, next) => {
    return res.json({ user: req.user });
  },
  othersProfile: async (req, res, next) => {
    console.log(req.params.name);
    const user = await User.findOne({
      "local.username": req.params.name,
      async function(err, data) {
        if (err) throw err;
        // await Executive.find({'location': req.params.location}, async function(err, result){
        //     if (err) throw err;
        console.log(data);
      }
    });
    res.json(user);
  },

  deleteProfile: async (req, res, next) => {
    try {
      const email = req.body.email;
      if (email != req.user.local.email) {
        req.flash("error", "Enter valid email");
        return res.status(403).json({ error: "Enter valid email" });
      }

      const user = await User.findOne({ "local.email": email });
      console.log("hii");
      console.log(user);
      const isValid = await user.isvalidPassword(req.body.password);
      if (!isValid) {
        return res.status(403).json({ error: "Enter valid password" });
      }

      User.findOneAndRemove({ "local.email": email }, function (err, res) {
        if (err) throw err;
        console.log("1 document removed");
      });

      res.json({ massage: "deleted successfully " });
    } catch (error) {
      next(error);
    }
  }
};
