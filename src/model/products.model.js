const mongoose = require('mongoose');

const productScheema = new mongoose.Schema(
    {
        categori_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            // require: true
        },
        subcategori_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategories',
            // require: true
        },
        subcategori_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategories',
            // require: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type:{
                public_id:String,
                url:String
            }
        },
        price: {
            type: Number,
            required: true,

        },
        stock: {
            type: Number,
            required: true,

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
)

const Products = mongoose.model('Products', productScheema);

module.exports = Products;