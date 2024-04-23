const{Schema, model} = require('mongoose')

const UserSchema = new Schema ({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    role: {
        type: String,
        required: true,
        enum: ['admin', 'patient', 'doctor'],
        default: 'patient',
    }
})

module.exports = model('Users', UserSchema)
