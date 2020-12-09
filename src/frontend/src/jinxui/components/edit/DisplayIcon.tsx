import React from "react";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";

const DisplayIcon = (props: any) => {
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
  } else {
    return (
      <>
        <LanguageIcon />
      </>
    );
  }
};

export default DisplayIcon