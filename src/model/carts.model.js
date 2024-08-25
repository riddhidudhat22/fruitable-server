const mongoose = require('mongoose');

const itemsScheema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            require: true
        },
        quantity: {
            type: Number,
            require: true,
            default:1
        }
    }
)

const cartsScheema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            require: true
        },
        items: [itemsScheema],

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

const Carts = mongoose.model('Carts', itemsScheema);
module.exports = Carts;