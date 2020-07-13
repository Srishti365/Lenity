const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const models = require('../models/models');
Payment = models.payment;

router.route('/')
    .post(passportJWT, async (req, res, next) => {
        await req.body;
        const { paymentid, payerid, paymenttoken, total } = req.body;

        const pay = new Payment({
            name: req.user.local.username,
            email: req.user.local.email,
            amount: total,
            paymentid,
            payerid,
            paymenttoken
        });
        await pay.save();
        console.log("payeddd", pay);
        res.json(pay);
    })


module.exports = router;