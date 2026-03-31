require('dotenv').config()
const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGODB_URL;

const Databaseconection = async()=>{
    try{
        const connect = await mongoose.connect(MONGO_URL)
        if(connect){
            console.log("database conection successfully")
        }else{
            console.log('something went wrong')
        }
    }catch(error){
        console.log(error)
    }
}
module.exports = Databaseconection