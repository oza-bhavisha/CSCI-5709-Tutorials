import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import React from "react";

const MyInput = styled(TextField)({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#6c5ce7 !important",
  },
  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d32f2f !important",
  },
  "& .Mui-focused": {
    color: "#6c5ce7 !important",
  },
});

const CustomInput = (props) => {
  return <MyInput {...props} />;
};

export default CustomInput;
