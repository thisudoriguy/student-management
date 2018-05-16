const mongoose = require('mongoose');

const studentSchema =  new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true

    },
    class:{
        type: String,
        required: true
    },
    parents_name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true
    },
    state_of_origin:{
        type: String,
        required: true
    }
});

// Virtual for book's URL

studentSchema
.virtual('url')
.get(function () {
  return '/student/' + this._id;
});

//Export model
module.exports = mongoose.model('Student', studentSchema);