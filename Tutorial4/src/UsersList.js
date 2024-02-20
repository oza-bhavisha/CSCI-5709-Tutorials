import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#6c5ce7",
    },
    "&:hover fieldset": {
      borderColor: "#6c5ce7",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6c5ce7",
    },
  },
});

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://express-t4.onrender.com/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user &&
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box p={3}>
      <StyledTextField
        label="Search by Name or Email"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <Grid container spacing={3}>
        {filteredUsers.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" align="center">
              No users found
            </Typography>
          </Grid>
        ) : (
          filteredUsers.map((user) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={user._id}
              onClick={() => navigate(`/users/${user._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card style={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={user.picture}
                  alt={`${user.name}`}
                  style={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email: {user.email}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default UsersList;
