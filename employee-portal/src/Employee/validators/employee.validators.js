const Joi = require("joi");

// Validation schema for employee creation
exports.validateEmployee = (data) => {
    const schema = Joi.object({
        employeeName: Joi.string().required().messages({
            "string.empty": "employeeName is not allowed to be empty"
        }),
        age: Joi.number().min(18).required().messages({
            "number.base": "age must be a number",
            "number.min": "age must be greater than or equal to 18",
            "number.empty": "age is not allowed to be empty"
        }),
        experience: Joi.number().required().messages({ 
            "number.base": "experience must be a number",
            "number.empty": "experience is not allowed to be empty" 
        }),
        designation: Joi.string().required().messages({
            "string.empty": "designation is not allowed to be empty"
        }),
        gender: Joi.string().valid("Male", "Female", "Other").required().messages({
            "any.only": "gender must be either 'Male', 'Female', or 'Other'",
            "string.empty": "gender is not allowed to be empty"
        }),
        city: Joi.string().required().messages({
            "string.empty": "city is not allowed to be empty"
        }),
        country: Joi.string().required().messages({
            "string.empty": "country is not allowed to be empty"
        }),
        phoneNumber: Joi.string().min(9).max(11).required().messages({
            "string.min": "phoneNumber must be at least 9 characters",
            "string.max": "phoneNumber must be at most 11 characters",
            "string.empty": "phoneNumber is not allowed to be empty"
        }),
        countryCode: Joi.string().required().messages({
            "string.empty": "countryCode is not allowed to be empty"
        }),
        email: Joi.string().email().required().messages({
            "string.email": "email is not allowed to be empty"
        }) 
    });

    return schema.validate(data, { abortEarly: false, convert: false });
};
