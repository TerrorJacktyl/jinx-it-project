import React from "react";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import SubjectSharp from "@material-ui/icons/SubjectSharp";
import InsertPhotoSharp from "@material-ui/icons/InsertPhotoSharp";
import VerticalSplitSharp from "@material-ui/icons/VerticalSplitSharp";

import { PrimaryMenu, DefaultSectionData, useSection } from "jinxui";

import { TEditSection } from "jinxui/types";

type TNewSectionMenu = {
  pageUid: string;
  section: any;
  placeAbove?: boolean;
};



const NewSectionMenu = (props: TNewSectionMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { getFetchedSections, handleSectionChange } = useSection();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddImageTextSection = () => {
    addSection("image_text");
  };

  const handleAddTextSection = () => {
    addSection("text");
  };

  const handleAddImageSection = () => {
    addSection("image");
  };

  const addSection = (section_type: string) => {
    setAnchorEl(null);

    const index = getFetchedSections(props.pageUid).findIndex(
      (p: TEditSection) => p.uid === props.section.uid
    );

    const target_index = props.placeAbove ? index : index + 1;
    const newSection = DefaultSectionData();
    newSection.type = section_type;

    handleSectionChange(props.pageUid, target_index, newSection);
  };

  return (
    <div>
      <Tooltip title="Add new section" arrow>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
      </Tooltip>
      <PrimaryMenu
        id="new-section-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddTextSection}>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem onClick={handleAddImageSection}>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem onClick={handleAddImageTextSection}>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </MenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default NewSectionMenu;
