const UserNormalizer = require("../normalizers/user.normalizer");
const UserModel = require("../models/user.model");

class UserController {
    static async getUser(req, res) {
        try {
            // req.user теперь содержит экземпляр UserModel
            const user = await UserModel.findOne({_id: req.user._id});

            if (!user) {
                return res.status(404)
                    .json({error: true, message: "Пользователь не найден"});
            }

            res.json(UserNormalizer.normalize(user));
        } catch (error) {
            console.error('Error in getUser:', error);
            res.status(500).json({error: true, message: "Internal server error"});
        }
    }
}

module.exports = UserController;