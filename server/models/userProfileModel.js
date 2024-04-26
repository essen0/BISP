const { Schema, model } = require('mongoose');

const UserProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    firstName: { type: String, required: false },
    secondName: { type: String, required: false },
    idNumber: { type: String, required: false, unique: true },
    gender: { type: String, required: false },
    age: { type: String, required: false },
    address: { type: String, required: false },
    telephoneNumber: { type: String, required: false },
});
 
module.exports = model('UserProfile', UserProfileSchema);
