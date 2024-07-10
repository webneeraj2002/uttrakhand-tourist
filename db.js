require('dotenv').config();
const mongoose = require('mongoose');
 const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGO_URL)
      console.log(`connect to mongodb_${mongoose.connection.host}`)
    }catch(error){
       console.log("db error", error)
    }
};

module.exports = connectDB;