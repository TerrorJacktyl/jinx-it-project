import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { PrimaryMenu, LinkDisplayIcon, LinkIconEnum } from "jinxui";

const LinkIconMenu = (props: any) => {
  const [anchorEl, setAnchorE1] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  const enumLength = Object.values(LinkIconEnum).length / 2

  const indexArray = Array.from(Array(enumLength).keys());

  return (
    <div>
      <Tooltip title="Choose a link icon">
        <Button onClick={handleClick}>
          <LinkDisplayIcon icon={props.linkIcon} />
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
        {indexArray.map((i: number) => {
          return (
            <MenuItem
              key={i}
              onClick={() => {
                props.setLinkIcon(i);
                handleClose();
              }}
            >
              <LinkDisplayIcon icon={i} />
            </MenuItem>
          )
        })}
      </PrimaryMenu>
    </div>
  );
};

export default LinkIconMenu;
