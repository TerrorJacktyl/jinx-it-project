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
import { Link } from "react-router-dom";
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
  if (title === undefined) {
    title = "The requested page could not be found.";
  }
  if (message === undefined) {
    message = "Check the URL if you typed it in manually.";
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
          <Link to="/">
            <SecondaryButton>Home Page</SecondaryButton>
          </Link>
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default NotFound;
