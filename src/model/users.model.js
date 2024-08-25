const mongoose = require('mongoose');

const usersScheema = new mongoose.Schema(
    {
        name: {
            type: String,
            // require: true,
            trim: true,
          
            lowercase: true
        },
       
        email: {
            type: String,
            // require: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            // require: true
        },
        role: {
            type: String,
            // require: true
        },
        refreshtoken:{
            type: String,
            trim: true,
        },
        avtar:{
            type: String,
        },
        googleId:{
            type: String,
        },
        facebookId:{
            type: String
        },
        isActive: {
            type: Boolean,
            default: true,

        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Users = mongoose.model('Users', usersScheema);

module.exports = Users;