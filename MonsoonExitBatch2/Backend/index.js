
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;


app.use(cors());
app.use(bodyParser.json());


mongoose
  .connect("mongodb+srv://afrahakimb22cs2109:3MgJJwopEzF37iRO@cluster.ll1otlu.mongodb.net/?retryWrites=true&w=majority&appName=cluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


const EmployeeSchema = new mongoose.Schema({
  EmpName: String,
  designation: String,
  empId: String,
  img_url: String,
});

const Employee = mongoose.model("Employee", EmployeeSchema);


app.post("/add", (req, res) => {
  const newEmployee = new Employee(req.body);
  newEmployee
    .save()
    .then(() => res.status(200).json({ message: " Employee Data added successfully!" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get("/get", (req, res) => {
  Employee.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete("/delete/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Employee data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Employee data", error: error.message });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});







