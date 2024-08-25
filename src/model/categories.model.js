
const mongoose = require("mongoose");

const categoryesScheema = new mongoose.Schema(
    {
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
            type: String,
            trim: true,
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

const Categories = mongoose.model('Categories', categoryesScheema)

module.exports = Categories;