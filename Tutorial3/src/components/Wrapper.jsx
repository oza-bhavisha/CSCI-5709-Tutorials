import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";

const Wrapper = ({ title, children }) => {
  return (
    <div className="container-1">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item md={4} sm={10} xs={10}>
          <Card style={{ padding: "10px" }}>
            <CardContent>
              <Typography
                variant="h2"
                textAlign="center"
                component="div"
                style={{ marginBottom: "30px" }}
              >
                {title}
              </Typography>
              {children}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Wrapper;
