import React from "react";

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import CameraIcon from "@material-ui/icons/Camera";
import CancelIcon from "@material-ui/icons/Cancel";
import FacebookIcon from "@material-ui/icons/Facebook";
import GetAppIcon from "@material-ui/icons/GetApp";
import GitHubIcon from "@material-ui/icons/GitHub";
import HouseIcon from "@material-ui/icons/House";
import HttpIcon from "@material-ui/icons/Http";
import InstagramIcon from "@material-ui/icons/Instagram";
import LanguageIcon from "@material-ui/icons/Language";
import LaunchIcon from "@material-ui/icons/Launch";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import LinkIcon from "@material-ui/icons/Link";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PinterestIcon from "@material-ui/icons/Pinterest";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PublicIcon from "@material-ui/icons/Public";
import RedditIcon from "@material-ui/icons/Reddit";
import StarIcon from "@material-ui/icons/Star";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import YouTubeIcon from "@material-ui/icons/YouTube";

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type TLinkDisplayIcon = {
  icon?: LinkIconEnum,
  size?: number
}
export const LinkDisplayIcon = (props: TLinkDisplayIcon) => {
  const fontSize = props.size ? props.size : 24;
  

  const useStyles = makeStyles((theme: Theme) => 
    createStyles({
      root: {
        fontSize: fontSize
      }
    })
  )

  const classes = useStyles();

  if (props.icon === LinkIconEnum.AltEmail) {
    return (
      <>
        <AlternateEmailIcon className={classes.root}/>
      </>
    );
  } else if (props.icon === LinkIconEnum.Camera) {
    return (
      <>
        <CameraIcon className={classes.root}/>
      </>
    );
  } else if (props.icon === LinkIconEnum.Cancel) {
    return (
      <>
        <CancelIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Facebook) {
    return (
      <>
        <FacebookIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.GetApp) {
    return (
      <>
        <GetAppIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.GitHub) {
    return (
      <>
        <GitHubIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.House) {
    return (
      <>
        <HouseIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Http) {
    return (
      <>
        <HttpIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Instagram) {
    return (
      <>
        <InstagramIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Language) {
    return (
      <>
        <LanguageIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Launch) {
    return (
      <>
        <LaunchIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.LinkedIn) {
    return (
      <>
        <LinkedInIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Link) {
    return (
      <>
        <LinkIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.LiveTv) {
    return (
      <>
        <LiveTvIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Mail) {
    return (
      <>
        <MailOutlineIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Pinterest) {
    return (
      <>
        <PinterestIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.PlayArrow) {
    return (
      <>
        <PlayArrowIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Public) {
    return (
      <>
        <PublicIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Reddit) {
    return (
      <>
        <RedditIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Star) {
    return (
      <>
        <StarIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Telegram) {
    return (
      <>
        <TelegramIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.Twitter) {
    return (
      <>
        <TwitterIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.WhatsApp) {
    return (
      <>
        <WhatsAppIcon className={classes.root} />
      </>
    );
  } else if (props.icon === LinkIconEnum.YouTube) {
    return (
      <>
        <YouTubeIcon className={classes.root} />
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


export enum LinkIconEnum {
  Disabled,
  AltEmail,
  Camera,
  Cancel,
  Facebook,
  GetApp,
  GitHub,
  House,
  Http,
  Instagram,
  Language,
  Launch,
  LinkedIn,
  Link,
  LiveTv,
  Mail,
  Pinterest,
  PlayArrow,
  Public,
  Reddit,
  Star,
  Telegram,
  Twitter,
  WhatsApp,
  YouTube,
}