const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    image: {type: String},
    isActive: {type: Boolean, default: true},
    isDeleted: {type: Boolean, default: false},
    createdDate: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Users', usersSchema);
