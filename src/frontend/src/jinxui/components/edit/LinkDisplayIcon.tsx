import React from "react";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import CancelIcon from "@material-ui/icons/Cancel";


const LinkDisplayIcon = (props: any) => {
  if (props.icon === "LinkedIn") {
    return (
      <>
        <LinkedInIcon />
      </>
    );
  } else if (props.icon === "Github") {
    return (
      <>
        <GitHubIcon />
      </>
    );
  } else if(props.icon === "Web") {
    return (
      <>
        <LanguageIcon />
      </>
    )
  } else {
    return (
      <>
        <CancelIcon color="disabled" />
      </>
    );
  }
};

export default LinkDisplayIcon