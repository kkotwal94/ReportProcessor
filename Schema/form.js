var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//define the schema for our users

var formSchema = mongoose.Schema({

   title: String,
   date : String,
   body : String,
   author : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   subform : [{type: mongoose.Schema.Types.ObjectId, ref : 'Form'}],
   isCompleted : {type: Boolean, default: false}
   
});



//make it modular and pass it to server.js
module.exports = mongoose.model('Form', formSchema);