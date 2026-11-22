const { errors } = require("../utils/constants/global");

function validatePicture(req, res, next) {
    if (!req.file) {
        return res.status(400).json({
            message: errors.NO_PICTURE,
        });
    }
    next();
}

module.exports = {
    validatePicture,
};