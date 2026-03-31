const mongoose = require('mongoose')
const schema = mongoose.Schema

const CategorySchema = new schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
})

const categorymodel = mongoose.model("prodcategory",CategorySchema)

module.exports = categorymodel