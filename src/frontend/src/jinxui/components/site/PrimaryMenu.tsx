import React from "react";
import Menu from "@material-ui/core/Menu";
import { MenuProps } from "@material-ui/core";

const StyledPrimaryMenu = React.forwardRef((props: MenuProps, ref: any) => (
  <Menu
    ref={ref}
    elevation={0}
    PaperProps={{
      style: {
        border: "1px solid #d3d4d5",
      }
    }}
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

export default StyledPrimaryMenu;
