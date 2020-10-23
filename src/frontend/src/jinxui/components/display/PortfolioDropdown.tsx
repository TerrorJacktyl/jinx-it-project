import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import MenuItem from "@material-ui/core/MenuItem";
import EditIcon from "@material-ui/icons/Edit";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import PaletteIcon from "@material-ui/icons/Palette";
import ShareIcon from "@material-ui/icons/Share";

import {
  HeaderButton,
  useUser,
  HeaderMediaWidth,
  PrimaryMenu,
  Routes,
  PortfolioThemes,
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

type TThemeMenu = {
  theme: Theme;
  setOpen: any;
};
const ThemeMenuItem = (props: TThemeMenu) => {
  const { setTheme, userData } = useUser();

  if (props.theme.portfolio.theme.name !== "Loading") {
    return (
      <MenuItem
        onClick={() => {
          props.setOpen(false);
          setTheme(userData.portfolioId, props.theme.portfolio.theme.name);
        }}
      >
        <ListItemIcon style={{ paddingLeft: 20 }}>
          {props.theme.portfolio.theme.name === userData.theme ? (
            <PaletteIcon color="secondary" />
          ) : (
            <PaletteIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={props.theme.portfolio.theme.name} />
      </MenuItem>
    );
  } else {
    return null;
  }
};

const PortfolioDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const [themeOpen, themeSetOpen] = React.useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
  const {
    userData,
    makePortfolioPublic,
    makePortfolioPrivate,
    getPortfolio,
  } = useUser();
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
    // setOpen(false)
    // At the moment, this fails if a portfolio hasn't been created yet.
    return (
      <>
        <Redirect to={Routes.PORTFOLIO_EDIT} />
        {/* {setEditRedirect(false)} */}
      </>
    );
  };

  const onView = () => {
    setOpen(false);
    setViewRedirect(false);
    return (
      <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />
    );
  };

  React.useEffect(() => {
    if (userData.authenticated) {
      const fetchPrivacy = async () => {
        const portfolio = await getPortfolio(userData.portfolioId);
        setIsPrivate(portfolio.private);
      };
      fetchPrivacy();
    }
  });

  const handleMakePublic = () => {
    setOpen(false);
    makePortfolioPublic(userData.portfolioId)
      .then((response: any) => {
        setIsPrivate(response.data.private);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleMakePrivate = () => {
    setOpen(false);
    makePortfolioPrivate(userData.portfolioId)
      .then((response: any) => {
        setIsPrivate(response.data.private);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleShareLink = () => {
    setOpen(false);
    const path = process.env.REACT_APP_FRONT_URL + "u/" + userData.username;
    navigator.clipboard.writeText(path);
  };

  if (editRedirect) {
    return onEdit();
  } else if (viewRedirect) {
    return onView();
  } else {
    return (
      <DivWrapper>
        {userData.username ? (
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
            <Link color="inherit" underline="none" href={Routes.PORTFOLIO_EDIT}>
              {/* Ideally use redirect instead of href if we can solve 
                  'menu disappearing' issue (#45)
              */}
              {/* <MenuItem onClick={() => {setEditRedirect(true);}}> */}
              <MenuItem>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            </Link>
            <Link
              color="inherit"
              underline="none"
              href={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
            >
              {/* <MenuItem onClick={() => {setViewRedirect(true);}}> */}
              <MenuItem>
                <ListItemIcon>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View" />
              </MenuItem>
            </Link>
            <MenuItem onClick={handleThemeToggle}>
              <ListItemIcon>
                <InvertColorsIcon />
              </ListItemIcon>
              <ListItemText primary="Themes" />
              {themeOpen ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
            <Collapse in={themeOpen} timeout="auto" unmountOnExit>
              {Object.values(PortfolioThemes).map((theme: Theme) => (
                <ThemeMenuItem
                  key={theme.portfolio.theme.name}
                  theme={theme}
                  setOpen={setOpen}
                />
              ))}
            </Collapse>
            <MenuItem onClick={handleShareLink}>
              <ListItemIcon>
                <ShareIcon />
              </ListItemIcon>
              <ListItemText primary="Copy Link" />
            </MenuItem>
            <MenuItem
              onClick={isPrivate ? handleMakePublic : handleMakePrivate}
            >
              <ListItemIcon>
                {isPrivate ? <LockIcon /> : <LockOpenIcon />}
              </ListItemIcon>
              <ListItemText
                primary={isPrivate ? "Make Public" : "Make Private"}
              />
            </MenuItem>
          </PrimaryMenu>
        </ClickAwayListener>
      </DivWrapper>
    );
  }
};

export default PortfolioDropdown;
