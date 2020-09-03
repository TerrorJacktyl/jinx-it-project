import styled from 'styled-components';
import React from 'react';

export type StyledButtonProps = {
    textColour: string;
    contrastColour: any;
};

export type StyledButtonDivProps = {
    borderColour: string;
    backgroundColour: any;
    width: any;
    hoverColour: any;
}

const ButtonBorder = styled.div<StyledButtonDivProps>`
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

    &:hover {
        ${({ hoverColour }) => hoverColour && `
            background-color: ${hoverColour};
        `}
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

    ${ButtonBorder}:hover & {
        ${({ contrastColour }) => contrastColour && `
            color: ${contrastColour};
        `}
    }
`

export type ButtonProps = {
    backgroundColour: any;
    textColour: string;
    hoverColour: any;
    contrastColour: any;
    width: any;
    text: string;
  } & JSX.IntrinsicElements["button"];

const Button = ({ width, textColour, backgroundColour, hoverColour, contrastColour, text, className}: ButtonProps) => {
    return(
        <ButtonBorder className={className} backgroundColour={backgroundColour} borderColour={textColour} width={width} hoverColour={hoverColour}>
            <ButtonComponent id="button" textColour={textColour} contrastColour={contrastColour}>
                {text}
            </ButtonComponent>
        </ButtonBorder>
    )
}

export default Button;