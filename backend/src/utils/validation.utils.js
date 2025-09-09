const Joi = require("@hapi/joi");
const config = require("../config/config");

class ValidationUtils {
    static signupValidation(data) {
        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().min(6).required().email()
                .messages({
                    'string.empty': `It is necessary to fill in the "E-mail"`,
                    'string.email': `The "E-mail" is incorrect`,
                    'string.min': `The "E-mail" is incorrect`,
                    'any.required': `It is necessary to fill in the "E-mail"`
                }),
            password: Joi.string().min(6).required()
                .messages({
                    'string.empty': `It is necessary to fill in the "Password"`,
                    'string.min': `The "password" must be at least 6 characters long`,
                    'any.required': `It is necessary to fill in the "Password"`
                }),
        });
        return schema.validate(data);
    }

    static loginValidation(data) {
        const schema = Joi.object({
            email: Joi.string().min(6).required().email()
                .messages({
                    'string.empty': `It is necessary to fill in the "E-mail"`,
                    'string.email': `The "E-mail" is incorrect`,
                    'string.min': `"The "E-mail" is incorrect`,
                    'any.required': `Необходимо заполнить "E-mail"`
                }),
            password: Joi.string().min(6).required()
                .messages({
                    'string.empty': `It is necessary to fill in the "Password"`,
                    'string.min': `The "password" must be at least 6 characters long`,
                    'any.required': `It is necessary to fill in the "Password"`
                }),
            rememberMe: Joi.boolean().default(false),
        });
        return schema.validate(data);
    }

    static refreshTokenValidation(data) {
        const schema = Joi.object({
            refreshToken: Joi.string().required()
                .messages({
                    'string.empty': `It is necessary to fill in the "Token"`,
                    'any.required': `It is necessary to fill in the "Token"`
                }),
        });
        return schema.validate(data);
    }

    static applyActionCommentValidation(data) {
        const schema = Joi.object({
            action: Joi.string().required().valid(...Object.values(config.userCommentActions))
                .messages({
                    'string.empty': `It is necessary to fill in the "Action"`,
                    'any.only': `The action can only be: ` + Object.values(config.userCommentActions).join(','),
                    'any.required': `It is necessary to fill in the "Action"`
                }),
        });
        return schema.validate(data);
    }

    static addCommentValidation(data) {
        const schema = Joi.object({
            text: Joi.string().required()
                .messages({
                    'string.empty': `It is necessary to fill in the "Text"`,
                    'any.required': `It is necessary to fill in the "Text"`
                }),
            title: Joi.string().required() // Изменено с article на title
                .messages({
                    'string.empty': `It is necessary to fill in the "Title"`,
                    'any.required': `It is necessary to fill in the "Title"`
                }),
        });
        return schema.validate(data);
    }
}

module.exports = ValidationUtils;