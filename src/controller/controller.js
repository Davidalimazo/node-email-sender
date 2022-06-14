const Comrade = require("../model/comrade.model");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    tls: {
        rejectUnAuthorized: true
    }
})

const getComrades = (req, res) => {
    Comrade.find().then(result => res.send(result)).catch(err => console.log(err.message));
}

const deleteComrade = (req, res) => {
    const { firstName, lastName } = req.body;

    Comrade.findOneAndDelete({ firstName, lastName }).then(result => res.send(result)).catch(err => console.log(err.message));
}

const insertComrade = (req, res) => {
    const { firstName, lastName, gender, occupation, mobile, email,
        state, lga, age, subscribe } = req.body;

    const options = {
        from: 'davidalimazo@gmail.com',
        to: `${email}`,
        subject: 'Welcome on board Comrade',
        text: `Welcome ${firstName + " " + lastName} to ComradeNg, we are glad to have you with us lets join hands and make Nigeria again. please follow us on our social media pages`
    }

    const newComrade = new Comrade({
        firstName, lastName, gender, occupation, mobile, email, age, subscribe,
        state, lga
    });

    newComrade.save().then((result) => {
        console.log("saved comrade successfully");

        if (subscribe) {
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log("Error sending email: " + err.message);
                    return
                }
                console.log("Mail sent successfully " + info)
            })
        }

        res.status(200).json({ result })
    }).catch(err => console.log(err.message));



}

module.exports = {
    getComrades, insertComrade, deleteComrade
}