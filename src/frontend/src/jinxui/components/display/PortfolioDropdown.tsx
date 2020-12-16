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
  usePortfolio,
  HeaderMediaWidth,
  PrimaryMenu,
  Routes,
  PortfolioThemes,
  SnackbarAlert,
} from "jinxui";

const DivWrapper = styled.div`
  height: 100%;
`;

const StyledName = styled(HeaderButton)`
  font-size: 20px;
  text-transform: none;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px
`;

const StyledInnerName = styled.div`
  margin-left: 10px;
  @media (max-width: ${() => HeaderMediaWidth()}) {
    display: none;
  }
`;

type TEditMenuItem = {
  edit_disabled: boolean;
};

const EditMenuItem = React.forwardRef((props: TEditMenuItem, ref: any) => {
  const [editRedirect, setEditRedirect] = useState(false);

  const onEdit = () => {
    // At the moment, this fails if a portfolio hasn't been created yet.
    return (
      <>
        <Redirect to={Routes.PORTFOLIO_EDIT} />
      </>
    );
  };

  if (editRedirect) {
    return onEdit();
  } else {
    return (
      <>
        <MenuItem
          ref={ref}
          onClick={() => {
            setEditRedirect(true);
          }}
          disabled={props.edit_disabled}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      </>
    );
  }
});

type TViewMenuItem = {
  view_disabled: boolean;
  edit_disabled: boolean;
};

const ViewMenuItem = React.forwardRef((props: TViewMenuItem, ref: any) => {
  const { userData } = useUser();
  const [viewRedirect, setViewRedirect] = useState(false);

  const onView = () => {
    return (
      <>
        <Redirect
          to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
        />
      </>
    );
  };

  if (props.view_disabled || props.edit_disabled) {
    if (viewRedirect) {
      return onView();
    } else {
      return (
        <>
          <MenuItem
            ref={ref}
            onClick={() => {
              setViewRedirect(true);
            }}
            disabled={props.view_disabled}
          >
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="View" />
          </MenuItem>
        </>
      );
    }
  } else {
    return (
      <Link
        color="inherit"
        underline="none"
        href={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username}
      >
        <MenuItem>
          <ListItemIcon>
            <VisibilityIcon />
          </ListItemIcon>
          <ListItemText primary="View" />
        </MenuItem>
      </Link>
    );
  }
});

type TThemeSelectorToggle = {
  rest_disabled: boolean;
  handleThemeToggle: any;
  themeOpen: boolean;
};
const ThemeSelectorToggle = React.forwardRef(
  (props: TThemeSelectorToggle, ref: any) => (
    <MenuItem
      ref={ref}
      onClick={props.handleThemeToggle}
      disabled={props.rest_disabled}
    >
      <ListItemIcon>
        <InvertColorsIcon />
      </ListItemIcon>
      <ListItemText primary="Themes" />
      {props.themeOpen ? <ExpandLess /> : <ExpandMore />}
    </MenuItem>
  )
);

type TThemeMenuItems = {
  themeOpen: any;
  setOpen: any;
};
const ThemeMenuItems = React.forwardRef((props: TThemeMenuItems, ref: any) => (
  <Collapse in={props.themeOpen} timeout="auto" unmountOnExit>
    {Object.values(PortfolioThemes).map((theme: Theme) => (
      <ThemeMenuItem
        ref={ref}
        key={theme.portfolio.theme.name}
        theme={theme}
        setOpen={props.setOpen}
      />
    ))}
  </Collapse>
));

type TThemeMenu = {
  theme: Theme;
  setOpen: any;
};
const ThemeMenuItem = React.forwardRef((props: TThemeMenu, ref: any) => {
  const { setTheme, userData } = useUser();

  if (props.theme.portfolio.theme.name !== "Loading") {
    return (
      <MenuItem
        ref={ref}
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
});

type TShareMenuItem = {
  handleShareLink: any;
  isPrivate: boolean;
  rest_disabled: boolean;
};
const ShareMenuItem = React.forwardRef((props: TShareMenuItem, ref: any) => (
  <MenuItem
    ref={ref}
    onClick={props.handleShareLink}
    disabled={props.rest_disabled || props.isPrivate}
  >
    <ListItemIcon>
      <ShareIcon />
    </ListItemIcon>
    <ListItemText primary="Copy Link" />
  </MenuItem>
));

type TPrivateMenuItem = {
  setOpen: any;
  rest_disabled: boolean;
  isPrivate: boolean;
  setIsPrivate: any;
};

const PrivacyMenuItem = React.forwardRef(
  (props: TPrivateMenuItem, ref: any) => {
    const {
      userData,
      setSuccessMessage,
      setErrorMessage,
    } = useUser();

    const {
      makePortfolioPrivate,
      makePortfolioPublic,
      getFetchedPortfolio,
    } = usePortfolio();

    const handleMakePublic = () => {
      props.setOpen(false);
      makePortfolioPublic(userData.portfolioId)
      .then((response: any) => {
        setSuccessMessage("Portfolio is now public")
          if (response) {
            props.setIsPrivate(response.data.private);
          }
        })
        .catch((error: any) => {
          console.log(error);
          setErrorMessage("Unable to set portfolio to private, something went wrong")
        });
    };

    const handleMakePrivate = () => {
      props.setOpen(false);
      makePortfolioPrivate(userData.portfolioId)
        .then((response: any) => {
          setSuccessMessage("Portfolio is now private")
          if (response) {
            props.setIsPrivate(response.data.private);
          }
        })
        .catch((error: any) => {
          setErrorMessage("Unable to set portfolio to private, something went wrong")
          console.log(error);
        });
    };

    React.useEffect(() => {
      let isMounted = true;
      if (userData.authenticated) {
        const fetchPrivacy = async () => {
          props.setIsPrivate(getFetchedPortfolio().private)
          // getFetchedPortfolio()
            // .then((response: any) => {
              // if (isMounted) {
              //   props.setIsPrivate(response.private);
              // }
            // })
            // .catch((error: any) => {
            //   console.log(error);
            // });
        };
        fetchPrivacy();
      }
      return () => {
        isMounted = false;
      };
    }, []);

    return (
      <MenuItem
        ref={ref}
        onClick={props.isPrivate ? handleMakePublic : handleMakePrivate}
        disabled={props.rest_disabled}
      >
        <ListItemIcon>
          {props.isPrivate ? <LockIcon /> : <LockOpenIcon />}
        </ListItemIcon>
        <ListItemText primary={props.isPrivate ? "Make Public" : "Make Private"} />
      </MenuItem>
    );
  }
);

type TPortfolioMenu = {
  isUserView?: boolean;
  isUserEdit?: boolean;
};
const PortfolioDropdown = React.forwardRef(
  (props: TPortfolioMenu, ref: any) => {
    const [open, setOpen] = React.useState(false);
    const [themeOpen, themeSetOpen] = React.useState(false);
    // const [errorMessage, setErrorMessage] = useState("");
    // const [successMessage, setSuccessMessage] = useState("");
    const [isPrivate, setIsPrivate] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const themeAnchorRef = React.useRef<HTMLButtonElement>(null);
    const { userData, setSuccessMessage, setErrorMessage } = useUser();

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

    const handleShareLink = () => {
      setOpen(false);
      const path = process.env.REACT_APP_FRONT_URL + "u/" + userData.username;
      navigator.clipboard.writeText(path);
      setSuccessMessage("Portfolio link copied to clipboard")
    };

    const view_disabled = props.isUserView === true;
    const edit_disabled = props.isUserEdit === true;
    const rest_disabled =
      props.isUserView !== true && props.isUserEdit !== true;

    return (
      <>
        <SnackbarAlert/>
      <DivWrapper>
        {userData.username ? (
          <StyledName
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <PersonalVideoIcon />
            <StyledInnerName>My Portfolio</StyledInnerName>
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
            <EditMenuItem edit_disabled={edit_disabled} />

            <ViewMenuItem
              view_disabled={view_disabled}
              edit_disabled={edit_disabled}
            />

            <ThemeSelectorToggle
              handleThemeToggle={handleThemeToggle}
              rest_disabled={rest_disabled}
              themeOpen={themeOpen}
            />

            <ThemeMenuItems themeOpen={themeOpen} setOpen={setOpen} />

            <ShareMenuItem
              rest_disabled={rest_disabled}
              isPrivate={isPrivate}
              handleShareLink={handleShareLink}
            />
            <PrivacyMenuItem
              setOpen={setOpen}
              rest_disabled={rest_disabled}
              isPrivate={isPrivate}
              setIsPrivate={setIsPrivate}
            />
          </PrimaryMenu>
        </ClickAwayListener>
      </DivWrapper>
      </>
    );
  }
);

export default PortfolioDropdown;
