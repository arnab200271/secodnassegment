const mongoose = require('mongoose')
const schema = mongoose.Schema

const ProductSchema = new schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"prodcategory"
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"sample.png"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const productModel = mongoose.model("Adminproduct",ProductSchema)

module.exports = productModel