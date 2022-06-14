const Comrade = require("../model/comrade.model");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure:465,
    auth:{
        user:'aydmediasolution@gmail.com',
        pass:'omega42k@'
    },
})


let comradeName, comradeEmail;

const options={
    from:'davidalimazo@outlook.com',
    to:`${comradeEmail}`,
    subject:'Welcome on board Comrade',
    text:`Welcome ${comradeName} to ComradeNg, we are glad to have you with us, lets join hand and make Nigeria again.`
}


const getComrades=(req, res)=>{
     Comrade.find().then(result=>res.send(result)).catch(err=>console.log(err.message));
}

const deleteComrade=(req, res)=>{
    const {firstName, lastName} = req.body;

    Comrade.findOneAndDelete({firstName, lastName}).then(result=>res.send(result)).catch(err=>console.log(err.message));
}

const insertComrade=(req, res)=>{
    const {firstName, lastName, gender, occupation, mobile, email, 
    state, lga, age, subscribe } = req.body;

    comradeName = firstName + " " + lastName;
    comradeEmail = email;

    const newComrade = new Comrade({firstName, lastName, gender, occupation, mobile, email, age, subscribe,
        state, lga});
        
    newComrade.save().then((result)=>{
        console.log("saved comrade successfully");

        if(subscribe){
            transporter.sendMail(options, (err, info)=>{
                if(err){
                    console.log("Error sending email: "+err.message);
                    return
                }
                console.log("Mail sent successfully "+ info)
            })
        }

        res.status(200).json({result})
    }).catch(err=>console.log(err.message));


        
}

module.exports={
    getComrades, insertComrade, deleteComrade
}