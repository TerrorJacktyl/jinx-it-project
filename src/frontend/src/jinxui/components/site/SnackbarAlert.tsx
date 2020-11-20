import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { LightTheme, DarkTheme, useUser } from "jinxui";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type TSaveAlert = {
  errorMessage: string;
  setErrorMessage: any;
  successMessage: string;
  setSuccessMessage: any;
};

const SnackbarAlert = (props: TSaveAlert) => {
  const { getSavedLightThemeMode } = useUser();
  const initialAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
  const [appliedTheme, setAppliedTheme] = useState(initialAppliedTheme);

  // const appliedTheme = createMuiTheme(
  //   getSavedLightThemeMode() ? LightTheme : DarkTheme
  // );

  useEffect(() => {
    const newAppliedTheme = getSavedLightThemeMode() ? LightTheme : DarkTheme;
    setAppliedTheme(newAppliedTheme)
  }, [getSavedLightThemeMode] );

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setErrorMessage("");
  };

  const handleSuccessClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSuccessMessage("");
  };

  return (
    <>
      <ThemeProvider theme={appliedTheme}>
        <Snackbar
          open={props.successMessage !== ""}
          autoHideDuration={2000}
          onClose={handleSuccessClose}
        >
          <Alert
            onClose={handleSuccessClose}
            severity="success"
            style={{
              fontWeight: 500,
            }}
          >
            {props.successMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={props.errorMessage !== ""}
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
            {props.errorMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </>
  );
};

export default SnackbarAlert;
