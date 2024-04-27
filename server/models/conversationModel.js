const{Schema, model} = require('mongoose')

const conversationSchema = new Schema ({
    participants:[
        {
            type: Schema.Types.ObjectId, ref: 'User'
        }
    ],
    messages:[
        {
            type: Schema.Types.ObjectId, ref: 'message', default:[]
        }

    ]
}, {timestamps:true})//createdAt updateAt

module.exports = model('conversation', conversationSchema)