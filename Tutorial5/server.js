const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 3000;

app.use(express.json());

const users = [];

// Fetch all users
app.get("/users", (req, res) => {
  res.json({
    message: "Users retrieved",
    success: true,
    users: users,
  });
});

// Add a new user
app.post("/add", (req, res) => {
  const { email, firstName } = req.body;
  if (!email || !firstName) {
    return res
      .status(400)
      .json({ message: "Missing email or firstName", success: false });
  }
  const newUser = { email, firstName, id: uuidv4() };
  users.push(newUser);
  res.json({ message: "User added", success: true });
});

// Update an existing user
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  if (email) user.email = email;
  if (firstName) user.firstName = firstName;
  res.json({ message: "User updated", success: true });
});

// Fetch a single user by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.json({ success: true, user: user });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
