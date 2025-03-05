const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    empId: { type: String, unique: true, required: true },
    employeeName: { type: String, required: true },
    age: { type: Number, required: true, min: 18 },
    experience: { type: Number, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phoneNumber: { type: String, required: true, minlength: 9, maxlength: 11 },
    countryCode: { type: String, required: true },
    email: { type: String, required: true, match: /.+\@.+\..+/ }
});

module.exports = mongoose.model("employeeDetails", employeeSchema);
