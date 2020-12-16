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
    isSaving,
  } = useUser();
  const initialAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
  const [appliedTheme, setAppliedTheme] = useState(initialAppliedTheme);
  const [successIsOpen, setSuccessIsOpen] = useState(false);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  useEffect(() => {
    const newAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
    setAppliedTheme(newAppliedTheme);
  }, [getSavedLightThemeMode]);

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorIsOpen(false);
    setTimeout(() => {
      setErrorMessage("");
    }, 1000);
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessIsOpen(false);
    setTimeout(() => {
      setSuccessMessage("");
    }, 1000);
  };

  useEffect(() => {
    if (getSuccessMessage() !== "" && !successIsOpen) {
      setSuccessIsOpen(true);
    }
  }, [getSuccessMessage()]);

  useEffect(() => {
    if (getErrorMessage() !== "" && !errorIsOpen) {
      setErrorIsOpen(true);
    }
  }, [getErrorMessage()]);


  return (
    <>
      <ThemeProvider theme={appliedTheme}>

        <Snackbar
          open={successIsOpen}
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
          open={errorIsOpen}
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
