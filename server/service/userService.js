const UserModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userdto')
const ApiError = require('../exceptions/apiError')
const { findOne } = require('../models/tokenModel')
const UserProfile = require('../models/userProfileModel')
const userProfileModel = require('../models/userProfileModel')



class UserService {
    async registration(email, password, role, profileData = {}) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf

        const user = await UserModel.create({email, password: hashPassword, activationLink, role})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        // Создание пустого профиля пользователя
        const userProfile = await UserProfile.create({ user: user._id }); 
        console.log(userProfile);
        const userDto = new UserDto(user); // id, email, isActivated
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken, userProfile._id );

        return {...tokens, user: userDto,userProfile: userProfile['_id']}
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

        const userP = await UserProfile.findOne({user: user._id})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        
        const userDto = new UserDto(user);
        userDto.userProfile = userP._id
        const tokens = tokenService.generateTokens({...userDto, });

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
        const userP = await UserProfile.findOne({user: user._id})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const userDto = new UserDto(user);
        userDto.userProfile = userP._id
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }
    async getAllDoctors(role){
        if (!role) {
            throw new Error("Role is required for fetching users.");
        }
        try {
            const users = await UserModel.find({ role: role });
            return users;
        } catch (error) {
            console.error("Failed to retrieve users by role:", error);
            throw error;
        }
    }
    async getUserProfile(ProfileId) {
        try {
            console.log(ProfileId);
            const userP = await UserProfile.findById(ProfileId);
            if (!userP) {
                throw new Error('User profile not found services');
            }
            return userP
        } catch (e) {
            console.log(e);
        }
    }
    async updateUserProfile(userProfile, firstName, secondName, gender, age, address, placeWasBorn, telephoneNumber,idNumber) {
        const data = {}
        if(firstName){
            data.firstName = firstName
        }
        if(secondName){
            data.secondName = secondName
        }
        if(gender){
            data.gender = gender
        }
        if(age){
            data.age = age
        }
        if(address){
            data.address = address
        }
        if(placeWasBorn){
            data.placeWasBorn = placeWasBorn
        }
        if(telephoneNumber){
            data.telephoneNumber = telephoneNumber
        }
        if(idNumber){
            data.idNumber = idNumber
        }
        console.log(`${data}server data`)
        const updatedP = await userProfileModel.findByIdAndUpdate(userProfile, data, {
            new:true
        })
        console.log(updatedP)
        return updatedP.save()
    }
}
module.exports = new UserService()