module.exports = class UserDto {
    email;
    id;
    isActivated;
    resetPassword

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.resetPassword = model.resetPassword;
    }
}