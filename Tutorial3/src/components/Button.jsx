import styled from "@emotion/styled";
import { Button } from "@mui/material";

const DesignedButton = styled(Button)({
  "&.MuiButton-root": {
    background: "#6c5ce7",
  },

  "&.MuiButton-root:hover": {
    background: "#40378A",
  },
});

const CustomButton = ({ name, onClick }) => {
  return (
    <DesignedButton
      variant="contained"
      fullWidth
      onClick={onClick}
      style={{ margin: "15px 0px" }}
    >
      {name}
    </DesignedButton>
  );
};

export default CustomButton;
