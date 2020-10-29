import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ButtonProps } from "@material-ui/core";
import {
  StylesProvider,
  makeStyles,
  createStyles,
} from "@material-ui/core/styles";
import { LightPrimaryButtonGrad, LightPrimaryButtonGradHover } from "jinxui";

const useStyles = makeStyles(() =>
  createStyles({
    primaryButton: {
      width: "200px",
      height: "40px",
      borderRadius: "5px",
      border: "1px solid",
      margin: "5px",
      marginTop: "10px",
      marginBottom: "10px",
      fontWeight: 400,
      fontSize: "16",
      textTransform: "none",
      background: LightPrimaryButtonGrad,
      "&:hover": {
        background: LightPrimaryButtonGradHover,
      },
    },
    secondaryButton: {
      width: "200px",
      height: "40px",
      border: "1px solid",
      borderRadius: "5px",
      margin: "5px",
      marginTop: "10p;",
      marginBottom: "10px",
    },
  })
);
const PrimaryButton = React.forwardRef((props: ButtonProps, ref: any) => {
  const classes = useStyles();
  return (
    <Button
      ref={ref}
      className={classes.primaryButton}
      variant="contained"
      {...props}
    />
  );
});

const SecondaryButton = React.forwardRef((props: ButtonProps, ref: any) => {
  const classes = useStyles();
  return (
    <Button
      ref={ref}
      className={classes.secondaryButton}
      variant="outlined"
      style={{
        fontWeight: 300,
        fontSize: 16,
        textTransform: "none",
      }}
      {...props}
    />
  );
});


export { PrimaryButton, SecondaryButton };
