import React from "react"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import MenuItem from "@material-ui/core/MenuItem"
import AddIcon from "@material-ui/icons/Add"
import SubjectSharp from "@material-ui/icons/SubjectSharp"
import InsertPhotoSharp from "@material-ui/icons/InsertPhotoSharp"
import VerticalSplitSharp from "@material-ui/icons/VerticalSplitSharp"

import { 
  PrimaryMenu,
  DefaultSectionData
} from "jinxui"

import {
  TEditSection
} from "jinxui/types"

type TNewSectionMenu = {
  section: any
  sections: any
  setSections: any
  placeAbove?: boolean
}

const NewSectionMenu = (props: TNewSectionMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddImageTextSection = () => {
    addSection("image_text")
  }

  const handleAddTextSection = () => {
    addSection("text")
  }

  const handleAddImageSection = () => {
    addSection("image")
  }

  const addSection = (section_type: string) => {
    setAnchorEl(null);
    const index = props.sections.findIndex(
      (p: TEditSection) => p.uid === props.section.uid
    );

    const target_index = props.placeAbove ? index : index + 1;
    
    const newSection = DefaultSectionData()
    newSection.type = section_type

    props.setSections([
      ...props.sections.slice(0, target_index),
      newSection,
      ...props.sections.slice(target_index)
    ]);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <PrimaryMenu
        id="new-section-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick = {handleAddTextSection}>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </MenuItem>
        <MenuItem onClick = {handleAddImageSection}>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </MenuItem>
        <MenuItem onClick = {handleAddImageTextSection}>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </MenuItem>
      </PrimaryMenu>
    </div>
  );
};

export default NewSectionMenu