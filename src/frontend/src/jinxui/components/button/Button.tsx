import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ButtonProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";
import { LightPrimaryButtonGrad, LightPrimaryButtonGradHover } from "jinxui"



const StartSecondaryButton = React.forwardRef(
  (props: ButtonProps, ref: any) => (
    <Button 
      ref={ref} 
      variant="outlined" 
      style={{
        fontWeight: 300,
        fontSize: 16,
        textTransform: "none",
      }}
      {...props} />
  )
);

const StartPrimaryButton = React.forwardRef((props: ButtonProps, ref: any) => {
  return(
    <StylesProvider injectFirst>
      <Button
        ref={ref} 
        variant="contained" 
        {...props} />
    </StylesProvider>
  )
});

const PrimaryButton = styled(StartPrimaryButton)`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid;
  margin: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 16;
  text-transform: none;
  background: ${props => LightPrimaryButtonGrad};
  :hover {
    background: ${props => LightPrimaryButtonGradHover};
  }
`;

const SecondaryButton = styled(StartSecondaryButton)`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export { PrimaryButton, SecondaryButton };
