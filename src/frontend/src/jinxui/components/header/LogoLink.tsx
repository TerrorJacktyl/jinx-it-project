import { LightTheme } from "jinxui/theme/GlobalTheme";
import React from "react";
import styled from "styled-components";

const LogoDiv = styled.div`
  display: flex;
  z-index: 1;
`;

const HeaderLogo = styled.img`
  margin: 5px;
  margin-right: 10px;
  max-height: 33px;
`;

const LogoText = styled(HeaderLogo)`
  @media (max-width: 480px) {
    display: none;
  }
`;

const LogoLink = (props: any) => {
  return (
    <a href="/">
      <LogoDiv>
        <HeaderLogo src={require("images/Logo_Small.svg")} />
        {props.lightTheme ? (
          <LogoText src={require("images/Logo_Text_Dark.svg")} />
        ) : (
          <LogoText src={require("images/Logo_Text.svg")} />
        )}
      </LogoDiv>
    </a>
  );
};

export default LogoLink;
