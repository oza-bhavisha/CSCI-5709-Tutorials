# Tutorial 3

## **Author**

Name: Bhavisha Oza \
Banner ID: B00935827 \
Email ID: bhavisha.oza@dal.ca \
Date Created: 13 February 2024 \
Last Modification Date: 15 February 2024

## Tutorial Deployed URL

- <https://aquamarine-swan-160da4.netlify.app/>

## GitLab URL

- <https://git.cs.dal.ca/boza/csci-5709-tutorials/-/tree/main/Tutorial3?ref_type=heads>

## Deployment

Project was deployed on Netlify and live on the mentioned [link](https://aquamarine-swan-160da4.netlify.app/).

### Deployment Steps

1. Run the command `npm run build` on your local machine to create a production build of the project.

2. Log in to your Netlify account and go to the 'Sites' tab.

3. Drag and drop the `build` folder (generated in step 1) into the designated area under the 'Manual deploys' section.

4. Netlify will automatically deploy your site, and you can view it live at the provided link.

## Features

- User registration with input validation for email, password, first name, and last name.
- Profile page displaying registered user details.

## Tech Stack

- [React](https://legacy.reactjs.org/docs/getting-started.html/)
- [Material UI](https://material-ui.com/)
- [React Router](https://reactrouter.com/)

## Built With

- [React](https://reactjs.org/docs/getting-started.html) - The web framework used
- [npm](https://docs.npmjs.com/) - Dependency Management

## Sources Used

### `Profile.js`

```
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
        elevation={6}
        sx={{
          p: 4,
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "15px",
          backgroundColor: "#fff",
          boxShadow: "0 12px 24px 0 rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Profile Details
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

```

The code above was created by adapting the code as shown below:

```
import * as React from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  let location = useLocation();

  React.useEffect(() => {
    // Google Analytics
    ga('send', 'pageview');
  }, [location]);

  return (
    // ...
  );
}

```

- I've used [useLocation()](https://reactrouter.com/en/main/hooks/use-location) hook to access the state passed from the Register component during navigation.

### `Register.js`

```
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
```

The code above was created by adapting the codes as shown below:

```
import { useNavigate } from "react-router-dom";

function useLogoutTimer() {
  const userIsInactive = useFakeInactiveUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userIsInactive) {
      fake.logout();
      navigate("/session-timed-out");
    }
  }, [userIsInactive]);
}

```

```
import { useState } from 'react';

function MyComponent() {
  const [age, setAge] = useState(28);
  const [name, setName] = useState('Taylor');
  const [todos, setTodos] = useState(() => createTodos());
  // ...
}
```

- I have used [useNavigate()](https://reactrouter.com/en/main/hooks/use-navigate) hook to navigate the user to the profile page after successful registration and [useState()](https://legacy.reactjs.org/docs/hooks-state.html) hook to manage the state of the form data and validation errors.

### `functions.js`

```
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
    password
  );
};

export const validateName = (name) => {
  return /^[A-Za-z]+$/.test(name);
};

```

Line 1-4

- The reggex validation for email has been understood form the website [regular-expression.info](https://www.regular-expressions.info/email.html) and tested on [regex101](https://regex101.com/) website.

Line 6-14

- The reggex validations has been tested on [regex101](https://regex101.com/) website.

## Additional Notes

- I have kept the design minimalistic.

* The base code structure has been taken from my Assignment-1 submission for code reusability.

* I have improved the code and enhanced the validation as per the feedback given by TA: Harsh Kathiria on my Assignment-1.
