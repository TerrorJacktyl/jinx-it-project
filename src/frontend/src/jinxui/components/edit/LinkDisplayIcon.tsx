import React from "react";

import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LanguageIcon from "@material-ui/icons/Language";
import CancelIcon from "@material-ui/icons/Cancel";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type TLinkDisplayIcon = {
  icon?: string,
  size?: number
}
const LinkDisplayIcon = (props: TLinkDisplayIcon) => {
  const fontSize = props.size ? props.size : 24;
  

  const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      root: {
        fontSize: fontSize
      }
    })
  )

  const classes = useStyles();

  if (props.icon === "LinkedIn") {
    return (
      <>
        <LinkedInIcon className={classes.root}/>
      </>
    );
  } else if (props.icon === "Github") {
    return (
      <>
        <GitHubIcon className={classes.root}/>
      </>
    );
  } else if(props.icon === "Web") {
    return (
      <>
        <LanguageIcon className={classes.root} />
      </>
    );
  } else {
    return (
      <>
        <CancelIcon color="disabled" className={classes.root} />
      </>
    );
  }
};

export default LinkDisplayIcon