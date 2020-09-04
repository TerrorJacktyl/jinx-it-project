import React from 'react';
import styled from 'styled-components';

const LogoDiv = styled.div`
    position: absolute;
    left: 0%;
    top: 0%;
    bottom: 0%;
    display: flex;
    z-index: 1;
`

const HeaderLogo = styled.img`
    margin: 5px;
    margin-right: 10px;
`

const LogoLink = () => (
    <a href="/">
        <LogoDiv>
            <HeaderLogo src={require("images/Logo_Small.svg")}/>
            <HeaderLogo src={require("images/Logo_Text.svg")}/>
        </LogoDiv>
    </a>
)

export default LogoLink;

