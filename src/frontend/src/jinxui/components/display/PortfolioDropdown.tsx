import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import {
  HeaderButton,
  useUser,
  HeaderMediaWidth,
  PrimaryMenu,
  Routes,
} from "jinxui";

const DivWrapper = styled.div`
  height: 100%;
`;

const StyledName = styled(HeaderButton)`
  font-size: 20px;
  text-transform: none;
  padding: 0px 10px;
`;

const StyledInnerName = styled.div`
  margin-left: 10px;
  @media (max-width: ${() => HeaderMediaWidth()}) {
    display: none;
  }
`;

const styles = {
  nested: {
    paddingLeft: "10%",
  },
  nestedSecondLevel: {
    paddingLeft: "20%",
  },
};

const PortfolioDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [themeOpen, themeSetOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
  const { userData } = useUser();
  const [editRedirect, setEditRedirect] = useState(false);
  const [viewRedirect, setViewRedirect] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleThemeToggle = () => {
    themeSetOpen((themePrevOpen) => !themePrevOpen);
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

  // return focus to the button when we transitioned from !open -> open
  const themePrevOpen = React.useRef(themeOpen);
  React.useEffect(() => {
    try {
      if (themePrevOpen.current === true && themeOpen === false) {
        themeAnchorRef.current!.focus();
      }

      themePrevOpen.current = themeOpen;
    } catch {}
  }, [themeOpen]);

  const onEdit = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return <Redirect to={Routes.PORTFOLIO_EDIT} />;
  };

  const onView = () => {
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
  };

  if (editRedirect) {
    return onEdit();
  } else if (viewRedirect) {
    return onView();
  } else {
    return (
      <DivWrapper>
        {userData.authenticated ? (
          <StyledName
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <PersonalVideoIcon />
            <StyledInnerName>Portfolio</StyledInnerName>
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
            <MenuItem
              onClick={() => {
                setEditRedirect(true);
              }}
            >
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setViewRedirect(true);
              }}
            >
              <ListItemIcon>
                <VisibilityIcon />
              </ListItemIcon>
              <ListItemText primary="View" />
            </MenuItem>
            <MenuItem onClick={handleThemeToggle}>
              <ListItemIcon>
                <InvertColorsIcon />
              </ListItemIcon>
              <ListItemText primary="Themes" />
              {themeOpen ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
            <Collapse in={themeOpen} timeout="auto" unmountOnExit>
              <MenuItem>
                <ListItemText primary="Desert" />
              </MenuItem>
            </Collapse>
          </PrimaryMenu>
        </ClickAwayListener>
      </DivWrapper>
    );
  }
};

export default PortfolioDropdown;
