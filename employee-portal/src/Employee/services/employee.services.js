const Employee = require("../models/employee.model");

// generate empId
const generateEmpId = async () => {
    const lastEmployee = await Employee.findOne().sort({ empId: -1 });
    const lastNumber = lastEmployee ? parseInt(lastEmployee.empId.replace("ED", "")) : 0;
    return `ED${String(lastNumber + 1).padStart(2, '0')}`;
};

// Create Employee
exports.createEmployee = async (data) => {
    const existingEmployee = await Employee.findOne({ email: data.email });
    if (existingEmployee) throw new Error("Employee already exists with this email");
    
    const empId = await generateEmpId();
    data.empId = empId;
    const employee = new Employee(data);
    const savedEmployee = await employee.save();

    // Convert to object and remove _id and __v before returning
    const result = savedEmployee.toObject();
    delete result._id;
    delete result.__v;

    return result;
};

// Get Employee by empId
exports.getEmployeeById = async (empId) => {
    const employee = await Employee.findOne({ empId }).lean();

    if (!employee) throw new Error("Employee not found");

    delete employee._id;
    delete employee.__v;

    return employee;;
};

// Update Employee Designation
exports.updateDesignation = async (empId, designation) => {
    return await Employee.findOneAndUpdate({ empId }, { designation }, { new: true }).select("-__v");
};

// Get Employee List with Pagination & Search
exports.getEmployeeList = async (start, offset, searchKey) => {
    const skip = (start - 1) * offset;
    const filter = searchKey ? { $or: [{ employeeName: new RegExp(searchKey, "i") }, { designation: new RegExp(searchKey, "i") }] } : {};
    //return await Employee.find(filter).skip(skip).limit(Number(offset));
    return await Employee.find(filter).skip(skip).limit(Number(offset)).select("-__v");

};

// Delete Employee
exports.deleteEmployee = async (empId) => {
    return await Employee.findOneAndDelete({ empId });
};
