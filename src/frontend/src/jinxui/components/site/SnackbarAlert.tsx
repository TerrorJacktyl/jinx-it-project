import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { LightTheme, DarkTheme, useUser } from "jinxui";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = () => {
  const { 
    getSavedLightThemeMode,
    setSuccessMessage,
    setErrorMessage,
    getSuccessMessage,
    getErrorMessage,
  } = useUser();
  const initialAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
  const [appliedTheme, setAppliedTheme] = useState(initialAppliedTheme);

  useEffect(() => {
    const newAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
    setAppliedTheme(newAppliedTheme)
  }, [getSavedLightThemeMode] );

  const handleErrorClose = (
    event?: React.SyntheticEvent, 
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // props.setErrorMessage("");
    setErrorMessage("")
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    // props.setSuccessMessage("");
    setSuccessMessage("")
  };

  const handleSuccessOpen = ( getSuccessMessage() !== "" );

  const handleErrorOpen = ( getErrorMessage() !== "" );

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <Snackbar
          open={handleSuccessOpen}
          autoHideDuration={3000}
          onClose={handleSuccessClose}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            style={{
              fontWeight: 500,
            }}
          >
            {getSuccessMessage()}
          </Alert>
        </Snackbar>
        <Snackbar
          open={handleErrorOpen}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert
            onClose={handleErrorClose}
            severity="error"
            style={{
              fontWeight: 500,
            }}
          >
            {getErrorMessage()}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};

export default SnackbarAlert;
