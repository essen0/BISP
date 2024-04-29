
const ConversationModel = require('../models/conversationModel.js')
const Message = require('../models/messageModel.js')
const User = require('../models/userModels.js')

class SendMessage {
    async sendMessage (req,res,next) {
        try {
            const message = req.body.message
            // console.log(message);
            // console.log(req.params.id);
            // console.log(req.user.id);
            const receiverId = req.params.id
            const senderId = req.user.id            

            let conversation = await ConversationModel.findOne({
                participants: {$all: [senderId, receiverId]},
            })

            if(!conversation){
                conversation = await ConversationModel.create({
                    participants: [senderId, receiverId],
                })
            }
            const newMessage = new Message({
                senderId: senderId,
                receiverId: receiverId,
                message: message,
            })

            if(newMessage){
                conversation.messages.push(newMessage._id)
            }



            await Promise.all([conversation.save(), newMessage.save()]);

            res.status(201).json(newMessage)
        } catch (e) {
            console.log(e);
            res.status(500).json({error: "server error"})
        }
    }
    async getMessages(req,res,next){
        try {
            const userToChatId = req.params.id
            const senderId = req.user.id

            const conversation = await ConversationModel.findOne({
                participants:{$all: [senderId, userToChatId]}
            }).populate("messages")// NOT REFERENCES BUT ACTUAL MESSAGES

            if(!conversation) return res.status(200).json([])

            const messages = conversation.messages

            res.status(200).json(messages)
        } catch (e) {
            console.log(e);
            res.status(500).json({error: "server error"})
            next()
        }
    }
    async getDoctorChat(req,res,next){
        try {
            const loggedInUserId = req.user.id
            const allDoctors = await User.find({
                _id: { $ne: loggedInUserId },
            }).select("-password").select("-isActivated").select("-activationLink").select("-__v")
            console.log(allDoctors);
            res.json(allDoctors);
            
        } catch (e) {
            console.log(e);
            res.status(500).json({error: "server error"})
            next()
        }
    }
}

module.exports = new SendMessage()