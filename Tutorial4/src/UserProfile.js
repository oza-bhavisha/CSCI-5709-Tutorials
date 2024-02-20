import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://express-t4.onrender.com/api/users/${id}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : user ? (
        <Card sx={{ mt: 5 }}>
          <CardMedia
            component="img"
            height="300"
            image={user.picture}
            alt={user.name}
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Divider />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {user.age}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {user.gender}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> {user.company}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {user.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>About:</strong> {user.about}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h5" sx={{ mt: 5 }}>
          User not found
        </Typography>
      )}
    </Container>
  );
}

export default UserProfile;
