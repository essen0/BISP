const{Schema, model} = require('mongoose')

const TokenSchema = new Schema ({
    user: {type: Schema.Types.Object, ref: 'Users'},
    refreshToken: {type: String, require: true},
})

module.exports = model('Token', TokenSchema)