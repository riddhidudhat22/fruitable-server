const mongoose = require('mongoose');

const shipingsScheema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            require: true
        },
        status: {
            type: String,
            require: true
        },
        location: {
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


const Shipings = mongoose.model('Shipings', shipingsScheema);
module.exports = Shipings;