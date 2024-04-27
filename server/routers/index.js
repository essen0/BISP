const Router = require('express').Router
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const sendMessageController = require('../controllers/sendMessageController')

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min:3, max:12}),
    userController.registration)
router.get('/profile', authMiddleware, userController.getUserProfile)
router.put('/profile', authMiddleware, userController.updateUserProfile)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/allusers', authMiddleware, userController.getAllUsers)
router.get('/doctors', authMiddleware, userController.getAllDoctors)
router.delete('/delete-account', authMiddleware, userController.DeletUser)
router.get('/messages/:id', authMiddleware, sendMessageController.getMessages)
router.post('/messages/send/:id', authMiddleware, sendMessageController.sendMessage)
router.get('/message/getDoctorChat', authMiddleware, sendMessageController.getDoctorChat)



module.exports = router