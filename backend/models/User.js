const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name:String,
    last_name:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    userStatus:{
        status:{
            type:String,
            enum:["Pending","Active"],
            default:"Pending"
        }
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:String
})
module.exports = mongoose.model('User',userSchema)