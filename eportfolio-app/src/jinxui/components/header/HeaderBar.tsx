import React, { Children } from "react";

import {
  AppBar,
  Typography,
  Slide,
  useScrollTrigger,
  ListItemIcon,
  ListItemText,
  Button,
  StylesProvider,
  Grid,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import {
  DarkTheme,
  LightTheme,
  UserAvatarDropdown,
  HeaderButton,
} from "jinxui";

import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";

import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  margin: 0px;
`;

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 46px;
  // grid-gap: 20px;
`;
const StyledDivLeft = styled.div`
  padding-left: 0px;
  display: flex;
  align-items: center;
`;

const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const StyledDivRight = styled.div`
  padding-right: 0px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const HeaderBar = (props: any) => {
  const trigger = useScrollTrigger();
  return (
    <StylesProvider injectFirst>
      {/* <ThemeProvider theme={LightTheme}> */}
        <Slide appear={false} direction="down" in={!trigger}>
          <StyledAppBar 
            color="inherit"
            elevation={2}
          >
            <StyledDivOuter>
              <StyledDivLeft>
                <HeaderButton
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </HeaderButton>
                <Typography variant="h6">Awesome Portfolio</Typography>
              </StyledDivLeft>
              <div></div>
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
