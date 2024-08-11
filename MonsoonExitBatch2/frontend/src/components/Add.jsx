import { Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    EmpName: "",
    designation: "",
    empId: "",
    img_url: ""
  });

  useEffect(() => {
    if (location.state && location.state.employee) {
      setInputs(location.state.employee);
    }
  }, [location]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (inputs._id) {
      
      axios.put(`http://localhost:3001/update/${inputs._id}`, inputs)
        .then((res) => {
          alert("Employee updated successfully");
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      
      axios.post("http://localhost:3001/add", inputs)
        .then((res) => {
          alert(res.data.message);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "600px",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Employee Name"
            onChange={inputHandler}
            name="EmpName"
            value={inputs.EmpName}
            fullWidth
          />
          <TextField
            variant="outlined"
            placeholder="Designation"
            onChange={inputHandler}
            name="designation"
            value={inputs.designation}
            multiline={4}
          />
          <TextField
            variant="outlined"
            placeholder="Employee Id"
            onChange={inputHandler}
            name="empId"
            value={inputs.empId}
          />
          <TextField
            variant="outlined"
            placeholder="Photo(paste any link from the browser)"
            onChange={inputHandler}
            name="img_url"
            value={inputs.img_url}
          />
          
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            {inputs._id ? "Update" : "Submit"}
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Add;