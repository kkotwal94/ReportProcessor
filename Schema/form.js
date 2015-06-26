var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var deepPopulate = require('mongoose-deep-populate');


//define the schema for our users

var formSchema = mongoose.Schema({

   title: String,
   date : String,
   body : String,
   author : [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
   subform : [{type: mongoose.Schema.Types.ObjectId, ref : 'Form'}],
   backupBody : String,
   final : String,
   isCompleted : {type: Boolean, default: false}
   
});


formSchema.plugin(deepPopulate);

//make it modular and pass it to server.js
module.exports = mongoose.model('Form', formSchema);