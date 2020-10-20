import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  HeaderBar,
  HeaderBarSpacer,
  LightTheme,
  SecondaryButton,
  SiteLayout,
} from "jinxui";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Layout = styled(SiteLayout)`
  padding-top: 10vh;
  padding-left: 20px;
  padding-right: 20px;
`;

interface NotFoundProps {
  title?: string;
  message?: string;
}

const NotFound = ({ title, message }: NotFoundProps) => {
  const history = useHistory();

  if (title === undefined) {
    title = "The requested resource could not be found.";
  }
  if (message === undefined) {
    message = "Check the URL, or press the back button to go back.";
  }
  return (
    <>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <HeaderBar lightTheme={true} />
        <HeaderBarSpacer />
        <Layout>
          <Typography variant="h3" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <SecondaryButton onClick={() => history.goBack()}>
            Go Back
          </SecondaryButton>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default NotFound;
