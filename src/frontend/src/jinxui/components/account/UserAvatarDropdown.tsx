import React from "react";
import styled from "styled-components";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { Person } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router-dom";

import {
  useUser,
  usePortfolio,
  Routes,
  PrimaryMenu,
  HeaderButton,
  HeaderMediaWidth,
} from "jinxui";

const StyledName = styled(HeaderButton)`
  text-transform: none;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledInnerName = styled.div`
  @media (max-width: ${() => HeaderMediaWidth()}) {
    display: none;
  }
`;

const UserAvatarDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { userData, logout } = useUser();
  const { resetFullPortfolio } = usePortfolio();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setOpen(false);
    setRedirect(true);
    logout()
    .then(() => {
        resetFullPortfolio();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (redirect) {
    return <Redirect to={Routes.LOGIN} />
  }
  else if (userData.username) {
    return (
      <>
        <StyledName
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Person />
          <StyledInnerName>{userData.firstName}</StyledInnerName>
          <ExpandMoreIcon fontSize="small" />
        </StyledName>
        <PrimaryMenu
          id="menu-list-grow"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </PrimaryMenu>
      </>
    );
  } else {
    return <> </>;
  }

};

export default UserAvatarDropdown;
