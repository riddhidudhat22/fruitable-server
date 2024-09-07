const mongoose = require("mongoose");


const itemsScheema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Types.ObjectId,
            ref: "Products",
            // required: true,
        },
        quntity: {
            type: Number,
            required: true,
            default: 1,
        },
    }
   
)

const categoryesScheema = new mongoose.Schema(
    {
        users_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            require: true
        },

        payment_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Payments',
            require: true
        },
        seller_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            require: true
        },
        amount: {
            type: Number,
            require: true
        },

        item: [itemsScheema],
        stats: {
            type: String,
            require: true
        },
        shiping_address: {
            type: String,
            require: true
        },
        discount:{
            type: Number,
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

const Orders = mongoose.model('Orders', categoryesScheema);

module.exports = Orders;