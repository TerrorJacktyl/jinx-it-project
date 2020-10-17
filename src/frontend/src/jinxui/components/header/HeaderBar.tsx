import React from "react";

import {
  AppBar,
  Typography,
  Slide,
  useScrollTrigger,
  StylesProvider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import {
  UserAvatarDropdown,
  HeaderButton,
  LightHeaderGrad,
  DarkHeaderGrad,
  LogoLink
} from "jinxui";

import styled from "styled-components";

// Ensure that app bar sticks to top and sides
const StyledAppBar = styled(AppBar)`
  margin: 0px;
`;

// Three columns, left middle and right
const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: minMax(46px, max-content);
`;

//Left items
const StyledDivLeft = styled.div`
  padding-left: 0px;
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

type HeaderBarProps = {
  title?: string;
  lightTheme: boolean;
  children?: React.ReactNode;
  hideLogo?: boolean;
}

const HeaderBar = (props: HeaderBarProps) => {
  const trigger = useScrollTrigger();
  const headerGrad = props.lightTheme === true ? LightHeaderGrad : DarkHeaderGrad;

  return (
    <StylesProvider injectFirst>
        <Slide appear={false} direction="down" in={!trigger}>
          <StyledAppBar 
            color="inherit"
            elevation={4}
            style={{
              background: headerGrad
            }}
            // position="sticky"
          >
            <StyledDivOuter>
              <StyledDivLeft>
                <HeaderButton
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </HeaderButton>
                <Typography variant="h6">{props.title ? props.title : ""}</Typography>
              </StyledDivLeft>
              <StyledDivCenter>
                { !props.hideLogo ? <LogoLink lightTheme={props.lightTheme}/> : null }
              </StyledDivCenter>
              <StyledDivRight>
                <UserAvatarDropdown />
                {props.children}
              </StyledDivRight>
            </StyledDivOuter>
          </StyledAppBar>
        </Slide>
    </StylesProvider>
  );
};

export default HeaderBar;
