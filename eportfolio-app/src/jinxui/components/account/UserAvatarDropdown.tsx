import React from "react";
import styled from "styled-components";
import { 
  useUser, 
  PrimaryMenuItem, 
  PrimaryMenu, 
  HeaderButton
} from "jinxui";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {MenuProps} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import {
  StylesProvider,
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
        {userData.firstName ? (
          <StyledName
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Person />
            <StyledInnerName>{userData.firstName}</StyledInnerName>
            <ExpandMoreIcon fontSize="small" />
          </StyledName>
        ) : null}
              <ClickAwayListener onClickAway={handleClose}>
                <PrimaryMenu
                  anchorEl={anchorRef.current}
                  role={undefined}
                  disablePortal
                  open={open}
                  onClose={handleClose}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <PrimaryMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <AccountBoxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                  </PrimaryMenuItem>
                  <PrimaryMenuItem onClick={handleClose}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Preferences" />
                  </PrimaryMenuItem>
                  <PrimaryMenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </PrimaryMenuItem>
                </PrimaryMenu>
              </ClickAwayListener>
      </StylesProvider>
    );
};

const StyledPaper = styled(Paper)`
  padding: 20px;
`;

const StyledName = styled(HeaderButton)`
  font-size: 20px;
  text-transform: none;
  padding: 0px;
`;

const StyledMenuList = styled(MenuList)`
  // color: white;
  // background-color: black;
  // z-index: 2;
`;

const StyledInnerName = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;


const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default UserAvatarDropdown;
