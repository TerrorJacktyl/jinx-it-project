import styled from "styled-components";
import React from "react";
import { CardActionArea } from "@material-ui/core";

export type StyledButtonProps = {
  textColour: string;
  contrastColour: any;
  fontSize: any;
};

export type StyledButtonDivProps = {
  borderColour: string;
  backgroundColour: any;
  width: any;
  hoverColour: any;
};

const ButtonBorder = styled.div<StyledButtonDivProps>`
  border-radius: 5px;
  width: 254px;

  ${({ width }) =>
    width &&
    `
        width: ${width};
    `}

  ${({ backgroundColour }) =>
    backgroundColour &&
    `
        background-color: ${backgroundColour};
    `}

    ${({ borderColour }) =>
    borderColour &&
    `
        border: 2px solid ${borderColour};
    `}

    &:hover {
    ${({ hoverColour }) =>
      hoverColour &&
      `
            background-color: ${hoverColour};
        `}
  }
`;

const ButtonComponent = styled.button<StyledButtonProps>`
  font-family: "Heebo", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  ${({ fontSize }) =>
    fontSize &&
    `
        font-size: ${fontSize};
    `}
  line-height: 35px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: auto;
  background-color: transparent;
  border-color: transparent;
  ${({ textColour }) =>
    textColour &&
    `
        color: ${textColour};
    `}
  outline: none;
  box-shadow: none;
  cursor: pointer;

  ${ButtonBorder}:hover & {
    ${({ contrastColour }) =>
      contrastColour &&
      `
            color: ${contrastColour};
        `}
  }
`;

const Button2 = styled.button`
  font-family: "Heebo", sans-serif;
  font-style: normal;
  font-weight: normal;
  color: #00FFC2;
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  margin-left: 0px;
  margin-right: auto;
  margin-top: 30px;
  display: block;

  // margin: auto;
  background-color: transparent;
  border: 2px solid #00FFC2;
  border-radius: 5px;
  max-width: 362px;
  width: 100%;
  height: 43px;
  :hover {
    background-color: #00FFC2;
    color: black; 
  }
  cursor: pointer;
`;

export type ButtonProps = {
  backgroundColour: any;
  textColour: string;
  hoverColour: any;
  contrastColour: any;
  width: any;
  text: string;
  fontSize: any;
  action: any;
  // type?: string;
} & JSX.IntrinsicElements["button"];

const Button = ({
  width,
  textColour,
  backgroundColour,
  hoverColour,
  contrastColour,
  text,
  fontSize,
  className,
  action,
  // type
}: ButtonProps) => {
  return (
    <ButtonBorder
      className={className}
      backgroundColour={backgroundColour}
      borderColour={textColour}
      width={width}
      hoverColour={hoverColour}
    >
      <ButtonComponent
      type = "button"
      id="button" 
      textColour={textColour} 
      contrastColour={contrastColour} 
      fontSize={fontSize} 
      onClick = {action}
      >
        {text}
      </ButtonComponent>
    </ButtonBorder>
  );
};

export {
  Button,
  Button2
};
