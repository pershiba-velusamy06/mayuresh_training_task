const employeeService = require("../services/employee.services");
const { validateEmployee } = require("../validators/employee.validators");

// router.post("/createEmployee", createEmployee);
exports.createEmployee = async (req, res) => {
    try {
        const { error } = validateEmployee(req.body);
        if (error) return res.status(400).json({ success: false, message: error.details[0].message });

        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json({ success: true, message: "Employee Created Successfully", result: employee });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: error.message || "Server Error" });
    }
};

//router.get("/getEmployee/:empId", getEmployeeById);
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.empId);
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        res.status(200).json({ success: true, message: "Employee fetched successfully", result: employee });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: "Server Error" });
    }
};

// router.patch("/updateDesignation", updateDesignation);
exports.updateDesignation = async (req, res) => {
    try {
        const { empId, designation } = req.body;
        if (!empId || !designation) return res.status(400).json({ success: false, message: "empId and designation are required" });
        const employee = await employeeService.updateDesignation(empId, designation);
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        res.status(200).json({ success: true, message: "Designation updated successfully", result: employee });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: "Server Error" });
    }
};

//router.get("/getEmployeeList", getEmployeeList);
exports.getEmployeeList = async (req, res) => {
    try {
        const { start, offset, searchKey } = req.query;
        
        if (!start || !offset || searchKey === undefined) {
            return res.status(400).json({ success: false, errorCode: -1, message: "All query parameters are mandatory" });
        }

        const employees = await employeeService.getEmployeeList(parseInt(start), parseInt(offset), searchKey);
        return res.status(200).json({ success: true, message: "Employee list fetched successfully", result: employees });

    } catch (error) {
        return res.status(500).json({ success: false, errorCode: -1, message: error.message, result: [] });
    }
};

// router.delete("/deleteEmployee", deleteEmployee);
exports.deleteEmployee = async (req, res) => {
    try {
        const { empId } = req.body;

        if (!empId) {
            return res.status(400).json({ success: false, errorCode: -1, message: "empId is required" });
        }

        const result = await employeeService.deleteEmployee(empId);

        if (!result) {
            return res.status(404).json({ success: false, errorCode: -1, message: "Employee not found" });
        }

        return res.status(200).json({ success: true, message: "Employee deleted successfully", result: result });

    } catch (error) {
        return res.status(500).json({ success: false, errorCode: -1, message: error.message, result: [] });
    }
};
