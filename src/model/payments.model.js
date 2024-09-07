const mongoose = require('mongoose');

const paymentsSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders'
    },
    gateway:{
        type: String
    },
    status: {
        type: String
    },
    isActive: {
        type: Boolean
    }
}, {
    timestamps: true,  
    versionKey: false
});

const Payments = mongoose.model('Payments', paymentsSchema);

module.exports = Payments;
