import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomButton from "./components/Button";
import CustomInput from "./components/Input";
import { Typography, Paper, Container, Box, Alert } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
    }
    if (!password) {
      setPasswordError("Password is required.");
    }

    if (email && password) {
      try {
        const response = await axios.post(
          "https://express-t4.onrender.com/api/login",
          {
            username: email,
            password: password,
          }
        );
        if (response.data) {
          navigate("/users");
        }
      } catch (error) {
        alert("Login failed!");
      }
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
          Login
        </Typography>
        <Box style={{ marginTop: "20px" }}>
          <CustomInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={{ margin: "10px 0" }}
          />
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <CustomInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ margin: "10px 0" }}
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          <CustomButton name="Login" onClick={handleSubmit} />
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
