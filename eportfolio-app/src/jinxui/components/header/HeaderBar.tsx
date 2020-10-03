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
} from "jinxui";

import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  margin: 0px;
`;

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: minMax(46px, max-content);
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
        <Slide appear={false} direction="down" in={!trigger}>
          <StyledAppBar 
            color="inherit"
            elevation={4}
          >
            <StyledDivOuter>
              <StyledDivLeft>
                <HeaderButton
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </HeaderButton>
                <Typography variant="h6">{props.title}</Typography>
              </StyledDivLeft>
              <StyledDivCenter></StyledDivCenter>
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
