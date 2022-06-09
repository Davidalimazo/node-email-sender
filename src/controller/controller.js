const Comrade = require("../model/comrade.model");

//const data=[{id:1, name:'Isreal'}, {id:2, name:'Joseph'}];


const getComrades=(req, res)=>{
     Comrade.find().then(result=>res.send(result)).catch(err=>console.log(err.message));
}

const deleteComrade=(req, res)=>{
    const {firstName, lastName} = req.body;

    Comrade.findOneAndDelete({firstName, lastName}).then(result=>res.send(result)).catch(err=>console.log(err.message));
}

const insertComrade=(req, res)=>{
    const {firstName, lastName, gender, occupation, mobile, email, 
    state, lga } = req.body;

    console.log(firstName, lastName, gender, occupation, mobile, email, 
    state, lga )

    const newComrade = new Comrade({firstName, lastName, gender, occupation, mobile, email, 
        state, lga});
    newComrade.save().then((result)=>{
        console.log("saved comrade successfully");
        res.status(200).json({result})
    }).catch(err=>console.log(err.message));
        
}

module.exports={
    getComrades, insertComrade, deleteComrade
}