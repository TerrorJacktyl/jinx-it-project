import React, { Children } from "react";

import {
  AppBar,
  Typography,
  Slide,
  useScrollTrigger,
  ListItemIcon,
  ListItemText,
  IconButton,
  StylesProvider,
  Grid,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import {
  DarkTheme,
  UserAvatarDropdown,
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
  // height: 46px;
  margin: 0px;
  // background-color: 'black';
`;

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  // grid-gap: 20px;
`;
const StyledDivLeft = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
`;

const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const StyledDivRight = styled.div`
  padding-right: 20px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const HeaderBar = (props: any) => {
  const trigger = useScrollTrigger();
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={DarkTheme}>
        <Slide appear={false} direction="down" in={!trigger}>
          <StyledAppBar style={{ backgroundColor: "#373a3e" }}>
            <StyledDivOuter>
              <StyledDivLeft>
                <IconButton
                  edge="start"
                  color="inherit"
                  // size="small"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
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
      </ThemeProvider>
    </StylesProvider>
  );
};

export default HeaderBar;
