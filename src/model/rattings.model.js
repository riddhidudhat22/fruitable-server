const mongoose = require('mongoose');

const rattingsScheema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            require: true
        },
        users_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            require: true
        },
        ratting: {
            type: Number,
            require: true
        },
        review: {
            type: String,
            require: true
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

const Rattings = mongoose.model('Rattings', rattingsScheema);

module.exports = Products;