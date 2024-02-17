const UserModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userdto')
const ApiError = require('../exceptions/apiError')
const { findOne } = require('../models/tokenModel')
const Token = require('../models/tokenModel')
const nodemailer = require('nodemailer')



class UserService {

    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
    async forgotPassword(email) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
        }

        const userDto = new UserDto(user)
        const token = await tokenService.generateResetToken({...userDto})
        await tokenService.saveToken(userDto.id, token.resetToken)

        const link = `${process.env.CLIENT_URL}/passwordReset?token=${tokenService.resetToken}`
        
        await mailService.sendForgorPassowrd(email, link)

        return{
            ...token,
            user: userDto
        }
    }
    async newPassword(email, password) {
        const hashPassword = await bcrypt.hash(password, 3);
        await UserModel.updateOne({email}, {password : hashPassword})
    }
}

module.exports = new UserService()


//    const forgotenPassword = await UserModel.findOne({email}) 
        //    if (!forgotenPassword) {
        //     throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не существует`)
        //     }
        //     const token = await tokenService.findOne(accessToken);
        //     if(token) {
        //         await token.removeToken()
        //     }
        //     let resetToken = crypto.randomBytes(32).toString("hex");
        //     const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

        //     await new Token({
        //         user: user._id,
        //         token: hash,
        //         accessToken,
        //         refreshToken
        //       }).save();
        //       const userDto = new UserDto(user);

        //       const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${userDto._id}`;
        //       sendEmail(userDto.email,`Password Reset Request,${link}`);
        //       return link; 