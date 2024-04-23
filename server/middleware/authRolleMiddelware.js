const ApiError = require('../exceptions/apiError');

function roleCheck(allowedRoles) {
    return function(req, res, next) {
        if (req.user && allowedRoles.includes(req.user.role)) {
            next();
        } else {
            return next(ApiError.Forbidden('You do not have permission to access this resource.'));
        }
    };
}

module.exports = roleCheck;