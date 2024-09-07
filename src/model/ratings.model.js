const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema(
    {
        product_id: {
             type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        users_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            // required: true
        },
        rating: {
            type: Number,
            required: true
        },
        review: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const Ratings = mongoose.model('Ratings', ratingsSchema);

module.exports = Ratings;