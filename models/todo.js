const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User",
        require : true
    } ,
    todo : [
        {
           task : {
               type : String
           }
        }
    ]
} , {timestamps:true})

module.exports = mongoose.model('todo',todoSchema);