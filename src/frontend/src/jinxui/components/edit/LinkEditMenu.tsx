import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LaunchIcon from "@material-ui/icons/Launch";

import { LinkDisplayIcon, PrimaryMenu, LinkDialog, useLink } from "jinxui";
import { TLinkData } from "jinxui/types";

type TLinkEditMenu = {
  link: TLinkData;
};
const LinkEditMenu = (props: TLinkEditMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    linkIndex,
    getFetchedLinks,
    handleLinkDelete,
    handleLinkMoveUp,
    handleLinkMoveDown,
  } = useLink();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveBack = () => {
    handleLinkMoveUp(props.link);
  };

  const handleMoveForward = () => {
    handleLinkMoveDown(props.link);
  };

  const handleDelete = () => {
    handleLinkDelete(props.link);
  };

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

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
        <LinkDialog link={props.link} setAnchoEl={setAnchorEl} />

        {props.link.address && props.link.address !== "" ? (
          <Link href={props.link.address} color="textPrimary" underline="none">
            <Tooltip title={props.link.address} arrow>
              <MenuItem>
                <ListItemIcon>
                  <LaunchIcon />
                </ListItemIcon>
                <ListItemText primary="Visit" />
              </MenuItem>
            </Tooltip>
          </Link>
        ) : (
          <MenuItem disabled={true}>
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText primary="Visit" />
          </MenuItem>
        )}

        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Box justifyContent="center" display="flex">
          <ButtonGroup variant="text" size="large">
            <Button
              onClick={handleMoveBack}
              disabled={linkIndex(props.link.id) < 1}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              onClick={handleMoveForward}
              disabled={linkIndex(props.link.id) > getFetchedLinks().length - 2}
            >
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </PrimaryMenu>
    </div>
  );
};

export default LinkEditMenu;
