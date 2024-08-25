const mongoose = require("mongoose");


const itemsScheema = new mongoose.Schema(
    {
        stats: {
            type: String,
            require: true
        },
        address:{
            type:String,
            require:true
        },
        shiping:{

        }
    }
)

const categoryesScheema = new mongoose.Schema(
    {
        users_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            require: true
        },
        saller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            require: true
        },
        payment_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Payments',
            require: true
        },
        amount: {
            type: Number,
            require: true
        },

        item:[itemsScheema],

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

const Orders=mongoose.model('Orders',categoryesScheema);

module.exports=Orders;