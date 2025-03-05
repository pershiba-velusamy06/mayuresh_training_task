const express = require("express");
const connectDB = require("./config/db");
const employeeRoutes = require("./src/Employee/routes/employee.routes");

require("dotenv").config();
connectDB();

const app = express();
app.use(express.json());
app.use("/emp", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
