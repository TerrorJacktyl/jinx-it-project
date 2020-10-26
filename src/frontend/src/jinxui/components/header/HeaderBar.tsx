import React from "react";

import {
  AppBar,
  Typography,
  Slide,
  useScrollTrigger,
  StylesProvider,
} from "@material-ui/core";


import {
  UserAvatarDropdown,
  LightHeaderGrad,
  DarkHeaderGrad,
  LogoLink,
  PortfolioDropdown,
  useUser,
  SecondaryButton,
  Routes,
} from "jinxui";

import styled from "styled-components";

const HeaderMediaWidth = () => {
  return "600px";
};

// Ensure that app bar sticks to top and sides
const StyledAppBar = styled(AppBar)`
  margin: 0px;
`;

// Three columns, left middle and right
const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: minMax(46px, max-content);
`;

//Left items
const StyledDivLeft = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

// Center items
const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

// Right items
const StyledDivRight = styled.div`
  padding-right: 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledDivTitle = styled.div`
  @media (max-width: ${() => HeaderMediaWidth()}) {
    display: none;
  }
`;

const StyledLogin = styled(SecondaryButton)`
  margin-top: 0px;
  margin-right: 30px;
  margin-left: 20px;
  margin-bottom: 0px;
  height: 30px;
  width: 120px;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

type HeaderBarProps = {
  title?: string;
  lightTheme: boolean;
  children?: React.ReactNode;
  hideLogo?: boolean;
  hideLogin? : boolean;
  hideBGLoggedOut? : boolean;
};

const HeaderBar = (props: HeaderBarProps) => {
  const { userData } = useUser();
  const trigger = useScrollTrigger();
  const headerGrad =
    props.lightTheme === true ? LightHeaderGrad : DarkHeaderGrad;

  return (
    <StylesProvider injectFirst>
      <Slide appear={false} direction="down" in={!trigger}>
        <StyledAppBar
          color={userData.authenticated || props.hideBGLoggedOut !== true ? "inherit" : "transparent"}
          elevation={userData.authenticated || props.hideBGLoggedOut !== true ? 4 : 0}
          style={userData.authenticated || props.hideBGLoggedOut !== true ? {background: headerGrad} : {}}>
          <StyledDivOuter>
            <StyledDivLeft>
              {!props.hideLogo ? (
                <LogoLink lightTheme={props.lightTheme} />
              ) : null}
            </StyledDivLeft>
            <StyledDivCenter>
              <StyledDivTitle>
                <Typography variant="h6">
                  {props.title ? props.title : ""}
                </Typography>
              </StyledDivTitle>
            </StyledDivCenter>
            <StyledDivRight>
              {props.children}
              {userData.authenticated || props.hideLogin ? null : (
                <StyledLink
                  href={
                    userData.authenticated
                      ? Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username
                      : Routes.LOGIN
                  }
                >
                  <StyledLogin>Login</StyledLogin>
                </StyledLink>
              )}
              <UserAvatarDropdown />
              <PortfolioDropdown />
            </StyledDivRight>
          </StyledDivOuter>
        </StyledAppBar>
      </Slide>
    </StylesProvider>
  );
};

export { HeaderBar, HeaderMediaWidth };
