import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


import { PrimaryMenu, DisplayIcon } from "jinxui";



const LinkIconMenu = (props: any) => {
  const [anchorEl, setAnchorE1] = useState<null | HTMLElement>(null);
  // const [linkIcon, setLinkIcon] = useState("Web");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleIconChoice = (icon_choice: string) => {
    props.setLinkIcon(icon_choice);
  };

  return (
    <div>
      <Tooltip title="Choose a link icon">
        <Button onClick={handleClick}>
          <DisplayIcon icon={props.linkIcon} />
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <PrimaryMenu
        id="link-icon-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            props.setLinkIcon("Web");
            handleClose();
          }}
        >
          <LanguageIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.setLinkIcon("Github");
            handleClose();
          }}
        >
          <GitHubIcon />
        </MenuItem>
        <MenuItem
          onClick={() => {
            props.setLinkIcon("LinkedIn");
            handleClose();
          }}
        >
          <LinkedInIcon />
        </MenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default LinkIconMenu;
