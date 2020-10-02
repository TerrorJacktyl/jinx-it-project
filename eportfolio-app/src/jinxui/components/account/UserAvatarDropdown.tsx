import React from "react";
import styled from "styled-components";
import { useUser } from "jinxui";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { StylesProvider } from "@material-ui/core/styles";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";

import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
);

const UserAvatarDropdown = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [logoutRedirect, setLogoutRedirect] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const { userData, logout } = useUser();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    try {
      if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
      }

      prevOpen.current = open;
    } catch {}
  }, [open]);

  const handleLogout = () => {
    logout()
      .then(() => {
        setOpen(false);
        setLogoutRedirect(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogout = () => {
    return <Redirect to="/login" />;
  };

  if (logoutRedirect) return onLogout();
  else
    return (
      <StylesProvider injectFirst>
        <NameDiv>
              {userData.firstName ? (
                <StyledName
                  ref={anchorRef}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <Person/>
                  <StyledInnerName>
                    {userData.firstName}
                  </StyledInnerName>
                </StyledName>
              ) : null}

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <StyledPaper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <StyledMenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-end"
                            spacing={1}
                          >
                            <Grid item xs>
                              <MenuItem onClick={handleClose}>Account</MenuItem>
                            </Grid>
                            <Grid item xs>
                              <MenuItem onClick={handleClose}>
                                Preferences
                              </MenuItem>
                            </Grid>
                            <Grid item xs>
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Grid>
                          </Grid>
                        </StyledMenuList>
                      </ClickAwayListener>
                    </StyledPaper>
                  </Grow>
                )}
              </Popper>
        </NameDiv>
      </StylesProvider>
    );
};

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const StyledName = styled(Button)`
  // color: white;
  font-size: 20px;
  text-transform: none;
  // text-transform: none;
`;

const NameDiv = styled.div`
  // position: absolute;
  // right: 0%;
  // top: 0%;
  // bottom: 0%;
  // display: flex;
  // z-index: 1;
  // padding-top: 10px;
`;

const StyledMenuList = styled(MenuList)`
  // color: white;
  // background-color: black;
  // z-index: 2;
`;

const StyledInnerName = styled.div`
  @media (max-width: 500px){
    display: none;
  }
`;

export default UserAvatarDropdown;
