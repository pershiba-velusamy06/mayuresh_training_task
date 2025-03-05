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
    return await employee.save();
};

// Get Employee by empId
exports.getEmployeeById = async (empId) => {
    return await Employee.findOne({ empId });
};

// Update Employee Designation
exports.updateDesignation = async (empId, designation) => {
    return await Employee.findOneAndUpdate({ empId }, { designation }, { new: true });
};

// Get Employee List with Pagination & Search
exports.getEmployeeList = async (start, offset, searchKey) => {
    const skip = (start - 1) * offset;
    const filter = searchKey ? { $or: [{ employeeName: new RegExp(searchKey, "i") }, { designation: new RegExp(searchKey, "i") }] } : {};
    return await Employee.find(filter).skip(skip).limit(Number(offset));
};

// Delete Employee
exports.deleteEmployee = async (empId) => {
    return await Employee.findOneAndDelete({ empId });
};
