const express = require("express");

const app = express();
app.use(express.json());

const users = [];

// For references, see the Bhavisha_Oza_README.md file.

app.get("/", (req, res) => {
  res.send("Tutorial 5 Sever: Bhavisha Oza");
});

app.get("/users", (req, res) => {
  res.json({
    message: "Users retrieved",
    success: true,
    users,
  });
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }

  if (email) user.email = email;
  if (firstName) user.firstName = firstName;

  res.json({ message: "User updated", success: true });
});

app.post("/add", (req, res) => {
  const { email, firstName } = req.body;
  const newUser = {
    id: Date.now().toString(),
    email,
    firstName,
  };
  users.push(newUser);
  res.json({
    message: "User added",
    success: true,
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.json({ success: true, user });
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found", success: false });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", success: false });
});

app.listen(8000, () => {
  console.log(`Server running on http://localhost:8000`);
});

module.exports = app;
