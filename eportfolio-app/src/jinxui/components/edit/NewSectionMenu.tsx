import React from "react"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import AddIcon from "@material-ui/icons/Add"
import SubjectSharp from "@material-ui/icons/SubjectSharp"
import InsertPhotoSharp from "@material-ui/icons/InsertPhotoSharp"
import VerticalSplitSharp from "@material-ui/icons/VerticalSplitSharp"

import { 
  PrimaryMenu,
  PrimaryMenuItem,
} from "jinxui"

const NewSectionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <PrimaryMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <PrimaryMenuItem>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </PrimaryMenuItem>
        <PrimaryMenuItem>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </PrimaryMenuItem>
        <PrimaryMenuItem>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </PrimaryMenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default NewSectionMenu