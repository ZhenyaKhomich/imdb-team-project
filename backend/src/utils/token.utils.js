const jwt = require("jsonwebtoken");
const config = require('../config/config');
const UserModel = require('../models/user.model');

class TokenUtils {
    static async generateTokens(user, rememberMe) {
        try {
            const payload = {
                id: user._id,
                email: user.email
            };

            const accessToken = jwt.sign(
                payload,
                config.secret,
                { expiresIn: rememberMe ? "1d" : "10d" }
            );

            const refreshToken = jwt.sign(
                payload,
                config.secret,
                { expiresIn: "30d" }
            );

            return { accessToken, refreshToken };
        } catch (err) {
            console.error('Error generating tokens:', err);
            throw err;
        }
    }

    static verifyRefreshToken(refreshToken) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findOne({ refreshToken });
                if (!user) {
                    return reject(new Error("Токен не валиден"));
                }

                jwt.verify(refreshToken, config.secret, (err, tokenDetails) => {
                    if (err) {
                        return reject(new Error("Токен не валиден"));
                    }
                    resolve({
                        tokenDetails,
                        error: false,
                        message: "Valid refresh token",
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = TokenUtils;