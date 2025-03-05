const Joi = require("joi");

// Validation schema for employee creation
exports.validateEmployee = (data) => {
    const schema = Joi.object({
        employeeName: Joi.string().required(),
        age: Joi.number().min(18).required(),
        experience: Joi.number().required(),
        designation: Joi.string().required(),
        gender: Joi.string().valid("Male", "Female", "Other").required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        phoneNumber: Joi.string().min(8).max(12).required(),
        countryCode: Joi.string().required(),
        email: Joi.string().email().required(),
    });

    return schema.validate(data);
};
