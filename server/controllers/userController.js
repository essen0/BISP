const { ad } = require('mongodb')
const userService = require('../service/userService')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/apiError')


class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
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

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

        //////////////////////////////////////////////////    //////////////////////////////////////////////////

        async getUserProfile(req, res, next) {
            try {
                const userProfile = await userService.getUserProfile(req.user.userProfile);
                if (!userProfile) {
                    return res.status(404).send({ message: "User profile not found" });
                }
                res.json(userProfile);
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
                


}

module.exports = new UserController()