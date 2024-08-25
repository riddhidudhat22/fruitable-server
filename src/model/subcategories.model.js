
const mongoose=require('mongoose');

const subcategoriesScheema=new mongoose.Schema(

    {   
        categori_id:{
            type:mongoose.Types.ObjectId,
            ref:"Categories",
            required:true
        },
        name:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        image:{
            type:String,

            trim:true,
        },
        isActive:{
            type:Boolean,
            default:true,

        }

    },
    {
        timestamps: true,
        versionKey:false
    }
)

const Subcategories=mongoose.model('Subcategories',subcategoriesScheema)

module.exports=Subcategories;