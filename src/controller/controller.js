const Comrade = require("../model/comrade.model");
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

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

const handlebarOptions = {
    viewEngine:{
        extname:'.handlebars',
        partialsDir:path.resolve(__dirname,'../views'),
        defaultLayout:false
    },
    viewPath:path.resolve(__dirname,'../views'),
    extname:'.handlebars'
}

transporter.use('compile', hbs(handlebarOptions))

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
        template:'email',
        attachments: [{
            filename: 'logo_1.png',
            path: path.join(__dirname, '../../', 'public/images/logo_1.png'),
            cid: 'logo'
        }],
        context:{
            title:`Welcome ${firstName + " " + lastName} to ComradeNg`,
            firstName:firstName,
            lastName:lastName,
            message:`We are glad to have you with us lets join hands and make Nigeria great again. please follow us on our social media pages`
        },
        
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
                console.log("Mail sent successfully " + info.response)
            })
        }

        res.status(200).json({ result })
    }).catch(err => console.log(err.message));



}

module.exports = {
    getComrades, insertComrade, deleteComrade
}