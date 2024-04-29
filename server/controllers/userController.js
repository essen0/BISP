const { ad } = require('mongodb')
const userService = require('../service/userService')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/apiError');
const userModels = require('../models/userModels');
const userProfileIdModel = require('../models/userProfileModel.js')


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, role} = req.body;
            const userData = await userService.registration(email, password, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }
    async getAllDoctors(req, res, next) {
        try {
            const role = "doctor"; 
            const doctors = await userService.getAllDoctors(role);
            res.status(200).json(doctors);
        } catch (error) {
            console.error("Error in getDoctors:", error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }

        async getUserProfile(req, res, next) {
            try {
                console.log(req.user.userProfile);
                const ProfileId = await userService.getUserProfile(req.user.userProfile);
                if (!ProfileId) {
                    return res.status(404).send({ message: "User profile not found controller" });
                }
                res.json(ProfileId);
            } catch (e) {
                next(e);
            }
        }
        async updateUserProfile(req, res, next) {
            try {
                const {firstName, secondName, gender, age, address, placeWasBorn, telephoneNumber,idNumber} = req.body
                const userProfile = req.user.userProfile;
                const updatedProfile = await userService.updateUserProfile(userProfile, firstName, secondName, gender, age, address, placeWasBorn, telephoneNumber,idNumber);
                res.status(200).json(updatedProfile);
            } catch (e) {
                console.log(e)
                next(e)
            }
        }
        async DeletUser(req,res,next){
            try {
                const usereId = req.user.id
                const userProfileId = req.user.userProfile
                await userModels.findByIdAndDelete(usereId)
                await userProfileIdModel.findByIdAndDelete(userProfileId)
                res.status(200).json({
                message: "User account has been deleted"
            })
            } catch (e) {
                console.log(e);
            }
        }
        async sendMessage (req,res) {
            console.log("message sent");
        }
}

module.exports = new UserController()