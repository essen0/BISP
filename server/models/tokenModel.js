const{Schema, model} = require('mongoose')

const TokenSchema = new Schema ({
    user: {type: Schema.Types.Object, ref: 'Users'},
    userProfile: {type: Schema.Types.ObjectId, ref:'UserProfile'},
    refreshToken: {type: String, required: true},

})

module.exports = model('Token', TokenSchema)