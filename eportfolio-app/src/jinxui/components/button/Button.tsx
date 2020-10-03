import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { ButtonProps } from "@material-ui/core";
import { StylesProvider } from "@material-ui/core/styles";

// const SecondaryButton = styled.button`
//   font-family: "Heebo", sans-serif;
//   font-style: normal;
//   font-weight: normal;
//   color: #eeeeee;
//   font-size: 24px;
//   line-height: 35px;
//   text-align: center;
//   margin-left: 0px;
//   margin-right: auto;
//   margin-top: 30px;
//   margin-bottom: 30px;
//   display: block;
//   background-color: transparent;
//   border-radius: 5px;
//   border: 2px solid #eeeeee;
//   border-radius: 5px;
//   max-width: 255px;
//   width: 100%;
//   height: 43px;
//   :hover {
//     background-color: #EEEEEE;
//     color: black;
//   }
//   cursor: pointer;
// `;

// const PrimaryButton = styled(SecondaryButton)`
//   color: #00FFC2;
//   border-radius: 5px;
//   border: 2px solid #00FFC2;
//   border-radius: 5px;
//   :hover {
//     background-color: #00FFC2;
//     color: black;
//   }
// `;

// const PrimaryButton = styled(SecondaryButton)`
//   font-weight: 400;
//   border: 1px solid;
// `;

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

const StartPrimaryButton = React.forwardRef((props: ButtonProps, ref: any) => (
  <StylesProvider injectFirst>
    <Button 
      ref={ref} 
      variant="contained" 
      color="secondary"
      style={{
        fontWeight: 400,
        fontSize: 16,
        textTransform: "none",
      }}
      {...props} />
  </StylesProvider>
));

const PrimaryButton = styled(StartPrimaryButton)`
  width: 200px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid;
  margin: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
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
