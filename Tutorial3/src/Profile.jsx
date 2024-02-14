import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Paper, Container, Box } from "@mui/material";

const Profile = () => {
  const location = useLocation();
  const { firstName, lastName, email } = location.state || {
    firstName: "N/A",
    lastName: "N/A",
    email: "N/A",
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
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
          Profile Page
        </Typography>
        <Box style={{ marginTop: "20px" }}>
          <Typography variant="h6" style={{ color: "#555" }}>
            <strong>First Name:</strong> {firstName}
          </Typography>
          <Typography variant="h6" style={{ color: "#555" }}>
            <strong>Last Name:</strong> {lastName}
          </Typography>
          <Typography variant="h6" style={{ color: "#555" }}>
            <strong>Email:</strong> {email}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
