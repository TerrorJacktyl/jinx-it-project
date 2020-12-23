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

import {
  LinkDisplayIcon,
  PrimaryMenu,
  LinkDialog,
  useLink,
  useSection,
} from "jinxui";
import { TLink } from "jinxui/types";

type TLinkEditMenu = {
  link: TLink;
  pageId?: string;
  sectionUid?: string;
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

  const {
    getFetchedSectionLinks,
    handleSectionLinkDelete,
    handleSectionLinkMoveUp,
    handleSectionLinkMoveDown,
  } = useSection();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveBack = () => {
    if ( props.pageId && props.sectionUid ) {
      handleSectionLinkMoveUp(props.pageId, props.sectionUid, props.link);
    } else {
      handleLinkMoveUp(props.link);
    }
  };

  const handleMoveForward = () => {
    if (props.pageId && props.sectionUid) {
      handleSectionLinkMoveDown(props.pageId, props.sectionUid, props.link);
    } else {
      handleLinkMoveDown(props.link);
    }
  };

  const handleDelete = () => {
    if (props.pageId && props.sectionUid) {
      handleSectionLinkDelete(props.pageId, props.sectionUid, props.link);
    } else {
      handleLinkDelete(props.link);
    }
  };

  const links = props.pageId && props.sectionUid 
    ? getFetchedSectionLinks(props.pageId, props.sectionUid)
    : getFetchedLinks();

  const backIsDisabled = props.pageId && props.sectionUid
    ? linkIndex(props.link.id, links) < 1
    : linkIndex(props.link.id) < 1;

  const forwardIsDisabled = props.pageId && props.sectionUid
    ? linkIndex(props.link.id, links) > links.length - 2
    : linkIndex(props.link.id) > links.length - 2;

  return (
    <div>
      <Tooltip title="Edit link" arrow>
        <Button onClick={handleClick}>
          <LinkDisplayIcon icon={props.link?.icon} />
          {props.link && props.link.title && props.link.title.length > 0 ? (
            <Box width="8px" />
          ) : (
            <></>
          )}
          <Typography variant="button">{props.link?.title}</Typography>
        </Button>
      </Tooltip>
      <PrimaryMenu
        id="link-edit-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.sectionUid && props.pageId ? (
          <LinkDialog 
            link={props.link} 
            setAnchoEl={setAnchorEl} 
            pageId={props.pageId}
            sectionUid={props.sectionUid} />
        ) : (
          <LinkDialog 
            link={props.link} 
            setAnchoEl={setAnchorEl} />
        )}

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
            <Button onClick={handleMoveBack} disabled={backIsDisabled}>
              <ArrowBackIcon />
            </Button>
            <Button onClick={handleMoveForward} disabled={forwardIsDisabled}>
              <ArrowForwardIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </PrimaryMenu>
    </div>
  );
};

export default LinkEditMenu;
