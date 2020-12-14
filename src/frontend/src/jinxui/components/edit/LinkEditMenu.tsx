import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateIcon from "@material-ui/icons/Create";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { LinkDisplayIcon, PrimaryMenu, LinkDialog } from "jinxui";
import { TLinkData } from "jinxui/types";

type TLinkEditMenu = {
  link: TLinkData;
  links: any;
  setLinks: any;
};
const LinkEditMenu = (props: TLinkEditMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    return (
      <>
        <LinkDialog links={props.links} setLinks={props.setLinks} />
      </>
    );
  };

  return (
    <div>
      <Tooltip title="Edit link" arrow>
        <Button onClick={handleClick}>
          <LinkDisplayIcon icon={props.link?.icon} />
          <Typography variant="h6">{props.link?.title}</Typography>
        </Button>
      </Tooltip>
      <PrimaryMenu
        id="link-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <LinkDialog
          links={props.links}
          setLinks={props.setLinks}
          link={props.link}
          setAnchoEl={setAnchorEl}
        />
        <MenuItem>
          <ListItemIcon>
            <DeleteOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Box justifyContent="center" display="flex">
          <ButtonGroup variant="text" size="large">
            <Button>
              <ArrowBackIcon />
            </Button>
            <Button>
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </PrimaryMenu>
    </div>
  );
};

export default LinkEditMenu;
