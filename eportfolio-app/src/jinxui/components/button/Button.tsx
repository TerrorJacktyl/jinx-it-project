import styled from 'styled-components';
import React from 'react';

export type StyledButtonProps = {
    textColour: string;
};

export type StyledButtonDivProps = {
    borderColour: string;
    backgroundColour: any;
    width: any;
    hoverColour: any;
}

const ButtonBorder = styled.div<StyledButtonDivProps>`
    position: absolute;
    border-radius: 5px;
    width: 254px;
    
    ${({ width }) => width && `
        width: ${width};
    `}

    ${({ backgroundColour }) => backgroundColour && `
        background-color: ${backgroundColour};
    `}

    ${({ borderColour }) => borderColour && `
        border: 2px solid ${borderColour};
    `}

    &:hover{
        ${({ hoverColour }) => hoverColour && `
            background-color: ${hoverColour};
        `
    }
`

const ButtonComponent = styled.button<StyledButtonProps>`
    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 35px;
    display: flex;
    align-items: center;
    text-align: center;
    margin: auto;
    background-color: transparent;
    border-color: transparent;
    ${({ textColour }) => textColour && `
        color: ${textColour};
    `}
    outline: none;
    box-shadow: none;
    cursor: pointer;
`

export type ButtonProps = {
    backgroundColour: any;
    textColour: string;
    hoverColour: any;
    width: any;
    text: string;
  } & JSX.IntrinsicElements["button"];

const Button = ({ width, textColour, backgroundColour, hoverColour, text, ...props}: ButtonProps) => {
    return(
        <ButtonBorder backgroundColour={backgroundColour} borderColour={textColour} width={width} hoverColour={hoverColour}>
            <ButtonComponent textColour={textColour}>
                {text}
            </ButtonComponent>
        </ButtonBorder>
    )
}

export default Button;