const employeeService = require("../services/employee.services");
const { validateEmployee } = require("../validators/employee.validators");

// router.post("/createEmployee", createEmployee);
exports.createEmployee = async (req, res) => {
    try {
        const { error } = validateEmployee(req.body);
        if (error) return res.status(500).json({ success: false, message: error.details[0].message, errorCode: -1, result: [] });

        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json({ success: true, message: "Employee Created Successfully", result: [employee] });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: error.message || "Server Error", result: [] });
    }
};

//router.get("/getEmployee/:empId", getEmployeeById);
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.empId);
        if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

        res.status(200).json({ success: true, message: "Employee fetched successfully", result: [employee] });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: "Server Error", result: [] });
    }
};

// router.patch("/updateDesignation", updateDesignation);
exports.updateDesignation = async (req, res) => {
    try {
        const { empId, designation, ...extraKeys } = req.body;
        if (!empId || !designation) return res.status(400).json({ success: false, message: "empId and designation are required" });
        if (Object.keys(extraKeys).length > 0) return res.status(500).json({ success: false, message: "Only empId and designation are allowed in the request body" });
        const employee = await employeeService.updateDesignation(empId, designation);
        if (!employee) return res.status(500).json({ success: false, message: "Employee not found", result: [] });

        res.status(200).json({ success: true, message: "Designation updated successfully", result: [employee] });
    } catch (error) {
        res.status(500).json({ success: false, errorCode: -1, message: "Server Error", result: [] });
    }
};

//router.get("/getEmployeeList", getEmployeeList);
exports.getEmployeeList = async (req, res) => {
    try {
        let { start, offset, searchKey, ...extraKeys } = req.query;
        if (extraKeys) {
            return res.status(500).json({ success: false, errorCode: -1, message: "Only start, offset, and searchKey are allowed as query parameters", result: [] });
        }   

        // start = parseInt(start, 10);
        // offset = parseInt(offset, 10);

        // Default to 1 if start is invalid or less than 1
        if (isNaN(start) || start < 1) {
            start = 1;
        }

        // Default to 10 if offset is invalid or less than 1
        if (isNaN(offset) || offset < 1) {
            offset = 10;
        }
        
        if (!start || !offset || searchKey === undefined) {
            return res.status(500).json({ success: false, errorCode: -1, message: "All query parameters are mandatory",result: [] });
        }

        const employees = await employeeService.getEmployeeList(parseInt(start), parseInt(offset), searchKey);
        return res.status(200).json({ success: true, message: "Employee list fetched successfully", result: [employees] });

    } catch (error) {
        return res.status(500).json({ success: false, errorCode: -1, message: error.message, result: [] });
    }
};

// router.delete("/deleteEmployee", deleteEmployee);
exports.deleteEmployee = async (req, res) => {
    try {
        const { empId, ...extraKeys } = req.body;

        if (!empId) {
            return res.status(500).json({ success: false, errorCode: -1, message: "empId is required" });
        }

        if (Object.keys(extraKeys).length > 0) {
            return res.status(500).json({ success: false, errorCode: -1, message: "Only empId is allowed in the request body" });
        }

        const result = await employeeService.deleteEmployee(empId);

        if (!result) {
            return res.status(500).json({ success: false, errorCode: -1, message: "Employee not found", result: [] });
        }

        return res.status(200).json({ success: true, message: "Employee deleted successfully", result: [] });

    } catch (error) {
        return res.status(500).json({ success: false, errorCode: -1, message: error.message, result: [] });
    }
};
