import React from "react";
import Menu from "@material-ui/core/Menu"
import { MenuProps } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"


const StyledPrimaryMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

export default StyledPrimaryMenu