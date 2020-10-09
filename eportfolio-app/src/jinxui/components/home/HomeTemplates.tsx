import styled from "styled-components"
import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const OuterDiv = styled.div`
  // width: 80%;
  height: 100vh;
  align-items: center;
`;

const HomeTemplates = (props: any) => {
  return (
    <OuterDiv>
      <Typography variant="h2">
        Choose from any of these great looking templates
      </Typography>
      <Grid 
        container 
        spacing={3} 
        alignContent="space-between" 
        alignItems="center">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Check out this template!</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Check out this template!</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Check out this template!</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ OuterDiv>
  );
};

export default HomeTemplates
