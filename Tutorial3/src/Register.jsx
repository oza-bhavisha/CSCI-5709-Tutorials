import React, { useState } from "react";
import CustomInput from "./components/Input";
import CustomButton from "./components/Button";
import { Typography, Paper, Container, Box } from "@mui/material";
import { validateEmail, validatePassword, validateName } from "./functions";
import { useNavigate } from "react-router-dom";

const dataObj = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const fieldsList = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
];

const Register = () => {
  const [data, setData] = useState({ ...dataObj });
  const [errors, setErrors] = useState({ ...dataObj });
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));

    const newErrors = { ...errors };
    switch (name) {
      case "email":
        newErrors.email = validateEmail(value)
          ? ""
          : "Please enter a valid email.";
        break;
      case "password":
        newErrors.password = validatePassword(value)
          ? ""
          : "Password should be 8 characters or more and include alpha-numeric with special characters.";
        break;
      case "confirmPassword":
        newErrors.confirmPassword =
          value === data.password ? "" : "Passwords do not match.";
        break;
      case "firstName":
        newErrors.firstName = validateName(value)
          ? ""
          : "First Name can only contain letters.";
        break;
      case "lastName":
        newErrors.lastName = validateName(value)
          ? ""
          : "Last Name can only contain letters.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = () => {
    const error = { ...dataObj };
    let isValid = true;

    if (!validateEmail(data.email)) {
      error.email = "Please enter a valid email.";
    }
    if (!validatePassword(data.password)) {
      error.password =
        "Password should be 8 characters or more and include alpha-numeric with special characters.";
    }
    if (data.password !== data.confirmPassword) {
      error.confirmPassword = "Passwords do not match.";
    }
    if (!validateName(data.firstName)) {
      error.firstName = "First Name can only contain letters.";
    }
    if (!validateName(data.lastName)) {
      error.lastName = "Last Name can only contain letters.";
    }

    Object.values(error).forEach((val) => {
      if (val) isValid = false;
    });

    if (isValid) {
      navigate("/profile", { state: { ...data } });
    } else {
      setErrors(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        style={{
          padding: "40px",
          marginTop: "40px",
          textAlign: "center",
          borderRadius: "15px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Register
        </Typography>
        <Box style={{ marginTop: "20px" }}>
          {fieldsList.map((field, key) => (
            <CustomInput
              style={{ width: "100%", margin: "10px 0" }}
              {...field}
              key={key}
              error={Boolean(errors[field.name])}
              helperText={errors[field.name]}
              onChange={handleOnChange}
            />
          ))}
          <CustomButton name="Register" onClick={handleSubmit} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
