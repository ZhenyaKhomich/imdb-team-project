const ValidationUtils = require("../utils/validation.utils");
const TokenUtils = require("../utils/token.utils");
const UserModel = require('../models/user.model');

class AuthController {
    static async signUp(req, res) {
        try {
            const {error} = ValidationUtils.signupValidation(req.body);

            if (error) {
                return res.status(400).json({error: true, message: error.details[0].message});
            }

            let user = await UserModel.findOne({email: req.body.email});
            if (user) {
                return res.status(400)
                    .json({error: true, message: "A user with such an E-mail already exists"});
            }

            let userObject = Object.assign({}, req.body);
            delete userObject.password;
            delete userObject.passwordRepeat;
            user = new UserModel(userObject);
            user.setPassword(req.body.password);
            const {accessToken, refreshToken} = await TokenUtils.generateTokens(user, req.body.rememberMe);
            user.refreshToken = refreshToken;
            await user.save();

            res.status(201).json({
                accessToken,
                refreshToken,
                userId: user.id,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: true, message: "Internal server error"});
        }
    }

    static async login(req, res) {
        try {
            const {error} = ValidationUtils.loginValidation(req.body);

            if (error) {
                return res.status(400).json({error: true, message: error.details[0].message});
            }

            const user = await UserModel.findOne({email: req.body.email});
            if (!user) {
                return res.status(401)
                    .json({error: true, message: "The user was not found"});
            }

            if (!user.checkPassword(req.body.password)) {
                return res.status(401)
                    .json({error: true, message: "Incorrect E-mail or password"});
            }

            const {accessToken, refreshToken} = await TokenUtils.generateTokens(user, req.body.rememberMe);

            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({
                accessToken,
                refreshToken,
                userId: user.id,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({error: true, message: "Internal server error"});
        }
    }

    static async refresh(req, res) {
        const {error} = ValidationUtils.refreshTokenValidation(req.body);
        if (error) {
            return res.status(400).json({error: true, message: error.details[0].message});
        }

        try {
            const {tokenDetails} = await TokenUtils.verifyRefreshToken(req.body.refreshToken);
            const user = await UserModel.findOne({email: tokenDetails.email});
            const {accessToken, refreshToken} = await TokenUtils.generateTokens(user);
            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({
                accessToken,
                refreshToken,
                userId: user.id,
            });
        } catch (e) {
            return res.status(400).json({
                error: true,
                message: e.message,
            });
        }
    }

    static async logout(req, res) {
        try {
            const {error} = ValidationUtils.refreshTokenValidation(req.body);
            if (error) {
                return res.status(400).json({error: true, message: error.details[0].message});
            }
            const user = await UserModel.findOne({refreshToken: req.body.refreshToken});
            if (!user) {
                return res.status(404).json({error: true, message: "The user does not exist"});
            }
            user.refreshToken = null;
            await user.save();

            res.status(200).json({error: false, message: "Successfully logged out"});
        } catch (err) {
            console.log(err);
            res.status(500).json({error: true, message: "Internal server error"});
        }
    }

}

module.exports = AuthController;