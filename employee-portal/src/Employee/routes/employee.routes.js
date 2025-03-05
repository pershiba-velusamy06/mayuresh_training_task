const express = require("express");
const { createEmployee, getEmployeeById, updateDesignation, getEmployeeList, deleteEmployee } = require("../controllers/employee.controllers");

const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/getEmployee/:empId", getEmployeeById);
router.patch("/updateDesignation", updateDesignation);
router.get("/getEmployeeList", getEmployeeList);
router.delete("/deleteEmployee", deleteEmployee);

module.exports = router;
