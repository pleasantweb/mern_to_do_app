const mongoose = require('mongoose')
const Schema = mongoose.Schema

const toDoSchema = new Schema({
    user:{
        type:mongoose.Types.ObjectId
    },
    list:{
        type:[{
            id:String,
            task:String,
            date:{type:Date,default:Date.now},
            status:{
                type:String,
                enum:['pending','finished'],
                default:"pending"
            }
        }]
    }
})
module.exports = mongoose.model('TodoList',toDoSchema)