const jwt = require('jsonwebtoken')
const tokenModel = require('../models/tokenModel')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCES_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }
    generateResetToken(payload) {
        const resetToken = jwt.sign(payload, process.env.JWT_RESET_SECRET, {expiresIn: '40m'})
        return {
            resetToken
        }
    }
    validateResetToken(token){
        try {
           const userData = jwt.verify(token, process.env.JWT_RESET_SECRET) 
           return userData
        } catch (e) {
            return null
        }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCES_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }

    async resetToken(userId, resetToken) {
        //const tokenData = await tokenModel.findOne({user:user})
        const token = await tokenModel.create({user: userId, resetToken})
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData;
    }
    
}

module.exports = new TokenService()