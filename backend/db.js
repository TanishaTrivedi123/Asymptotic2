const mongoose = require("mongoose");

const dbURL = process.env.MONGO_URL;

const connecDB = async() => {
    try{
        await mongoose.connect(dbURL);
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
}

module.exports = connecDB;