const userModel = require('../models/users');

module.exports = {
    checkEmail: function(req, res, next) {
        userModel.findOne({ email: req.body.email }, function (err, userInfo) {
            if (err) {
                next(err);
            } else {
                if(userInfo){
                    return userInfo;
                } else {
                    return null;
                }
            }
        });
        
    }
}