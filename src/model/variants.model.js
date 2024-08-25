const mongoose = require('mongoose');



const variantsScheema = new mongoose.Schema(
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
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        stock: {
            type: Number,
            require: true
        },
        discount: {
            type: Number,
            require: true
        },
        atributes:{},
        image: {
            type:{
                public_id:String,
                url:String
            }
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

const Variants = mongoose.model('Variants', variantsScheema)

module.exports = Variants;

