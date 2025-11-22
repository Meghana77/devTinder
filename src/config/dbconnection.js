const mongoose = require('mongoose');

const connectDb = async () => {
   try {
    await mongoose.connect(process.env.CONNECTION_SECRET);
   }catch(e){
    throw new Error("DB connection failed");
   }
}

module.exports = connectDb;