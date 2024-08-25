const mongoose = require('mongoose');
const { version } = require('os');

const paymentsScheema = (
    {
        order_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Orders',
            require: true
        },
        payment_type: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true
        },
        isActive: {
            type: Boolean,
            default: true,

        }

    },
    {
        timeStamp: true,
        versionKey: false
    }
);

const Payments = mongoose.model('Payments', paymentsScheema);

module.exports = Payments;