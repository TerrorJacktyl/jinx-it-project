import React from "react";
import styled from "styled-components";
import { useUser, PrimaryMenu, HeaderButton, Routes } from "jinxui";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Person } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { Redirect } from "react-router-dom";

const StyledName = styled(HeaderButton)`
  font-size: 20px;
  text-transform: none;
  padding: 0px;
`;

const StyledInnerName = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

const UserAvatarDropdown = () => {
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
    return <Redirect to={Routes.LOGIN} />
  }

  if (logoutRedirect) return onLogout();
  else
    return (
      <>
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
            id="menu-list-grow"
            anchorEl={anchorRef.current}
            role={undefined}
            disablePortal
            open={open}
            onClose={handleClose}
            onKeyDown={handleListKeyDown}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AccountBoxIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Preferences" />
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </PrimaryMenu>
        </ClickAwayListener>
      </>
    );
};

export default UserAvatarDropdown;
