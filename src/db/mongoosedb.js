const mongoose = require('mongoose');

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONECTION_ECOMERCE)
        .then(()=>{console.log('mongoDB conetion success')})
        .catch((error)=>{console.log("mongoDB conection error"+error)})
    } catch (error) {
        console.log("mongoDB conection error"+error);
    }
}

module.exports=connectDB