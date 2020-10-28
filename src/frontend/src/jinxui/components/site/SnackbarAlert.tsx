import React from "react"
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";


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
  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setErrorMessage("");
  };

  const handleSuccessClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    props.setSuccessMessage("");
  };

  return (
    <>
      <Snackbar
        open={props.successMessage !== ""}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          {props.successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={props.errorMessage !== ""}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {props.errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackbarAlert