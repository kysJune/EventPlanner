const mongoose = require("mongoose");
require('dotenv').config();
const mongoUri = process.env.MONGO_DB_URL;

    async function connectMongo(){
    try{
        await mongoose.connect(mongoUri,{
            family: 4,
        });
        console.log("connected to the mongo database");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {connectMongo} 
