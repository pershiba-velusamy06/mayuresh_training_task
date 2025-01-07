class Employee {
    constructor() {
        this.employees = [];
        this.employeeId = 1;
    }

    // Add a new employee
    addEmployee(name, designation, taskStatus, description) {
        const newEmployee = {
            employeeId: this.employeeId,
            name: name,
            designation: designation,
            taskStatus: taskStatus,
            description: description
        };
        this.employees.push(newEmployee);
        this.employeeId++;
        console.log("Added Employee:", newEmployee);
    }

    // Get all employees
    getAllEmployees() {
        return this.employees;
    }

    // Get a specific employee by ID
    getParticularEmployee(id) {
        const employee = this.employees.find(function (emp_id) {
            return emp_id.employeeId === id;
        });
        return employee ? employee : "Employee not found with ID " + id + ".";
    }

    // Delete an employee by ID
    deleteEmployee(id) {
        const index = this.employees.findIndex(function (emp_id) {
            return emp_id.employeeId === id;
        });
        if (index !== -1) {
            const deletedEmployee = this.employees.splice(index, 1)[0];
            console.log("Deleted Employee:", JSON.stringify(deletedEmployee));
            return "Employee with ID " + id + " deleted successfully.";
        }
        return "Employee not found with ID " + id + ".";
    }

    // List employees with pending tasks
    listPendingTasks() {
        const pendingTasks = this.employees.filter(function (emp_id) {
            return emp_id.taskStatus.toLowerCase() === "pending";
        });
        console.log("Pending Tasks:", JSON.stringify(pendingTasks));
        return pendingTasks;
    }
}

// Update employee description
function updateEmployeeDescription(employeePortal, employeeId, newDescription) {
    for (var i = 0; i < employeePortal.employees.length; i++) {
        if (employeePortal.employees[i].employeeId === employeeId) {
            employeePortal.employees[i].description = newDescription;
            console.log("Updated Description for Employee ID " + employeeId + ".");
            return "Description updated for Employee ID " + employeeId + ".";
        }
    }
    return "Employee not found with ID " + employeeId + ".";
}

// Automatically update task status after 5 seconds
function autoCompleteTask(employeePortal, employeeId) {
    var employee = employeePortal.employees.find(function (emp) {
        return emp.employeeId === employeeId;
    });

    if (!employee) {
        return "Employee not found with ID " + employeeId + ".";
    }

    if (employee.taskStatus.toLowerCase() !== "pending") {
        return "Task status for Employee ID " + employeeId + " is not 'pending'.";
    }

    console.log("Task for Employee ID " + employeeId + " will be marked as completed in 5 seconds.");

    setTimeout(function () {
        employee.taskStatus = "completed";
        console.log("Task status updated to 'completed' for Employee ID " + employeeId + ".");
    }, 5000);

    return "Scheduled task status update for Employee ID " + employeeId + ".";
}


var employeePortal = new Employee();
employeePortal.addEmployee("Arun", "QA", "pending", "");
employeePortal.addEmployee("Raj", "Node Developer", "completed", "aaaaa");
employeePortal.addEmployee("Rani", "React Developer", "pending", "Great work");

console.log(autoCompleteTask(employeePortal, 1)); 
console.log(updateEmployeeDescription(employeePortal, 1, "Completed JS module successfully."));

setTimeout(function () {
    console.log(employeePortal.getAllEmployees()); 
    console.log(employeePortal.listPendingTasks()); 
}, 6000);

console.log(employeePortal.getParticularEmployee(1)); 
console.log(employeePortal.deleteEmployee(3)); 
console.log(employeePortal.getAllEmployees());
