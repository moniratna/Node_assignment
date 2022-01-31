const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/register', async (req, res) => {
    const sendMail = (email)=>{
        const Transport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "munai.munshi.moniratna@gmail.com",
                pass: "hpivtpeuskewgcck"
            }
        });
        var mailOptions;
        let sender = "Moniratna";
        mailOptions = {
            from: sender,
            to: email,
            subject: "Email Confirmation",
            html: "Welcome to our website. Thanks"
        };
        Transport.sendMail(mailOptions, function(error,response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
        })
    }
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            email: req.body.email,
            password: req.body.password
        });
        await user.save();
        sendMail(req.body.email)
        res.status(200).send("User Created");
    }
});

module.exports = router;