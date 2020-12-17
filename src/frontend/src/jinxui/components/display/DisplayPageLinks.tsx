import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip"

import { useLink, LinkDisplayIcon } from "jinxui";

import { TLinkData } from "jinxui/types";

/**
 * Run through all the saved links
 * If the link has an address, make it into a clickable link, 
 *  otherwise make it a graphic
 * If link has an icon, display it
 */
const DisplayPageLinks = () => {
  const { getFetchedLinks } = useLink();

  const GetLinkDisplayIcon = (props: any) => {
    if (props.link.icon && props.link.icon != "None") {
      return <LinkDisplayIcon icon = {props.link.icon} />
    } else {
      return <></>
    }
  }

  return (
    <>
      {getFetchedLinks().map((link: TLinkData) => {
        return (
          <div key={link.id}>
            {link.address && link.address !== "" ? (
              /* Address exists */
              <Tooltip title={link.address} >
              <Link href={link.address} color="textPrimary" underline="none">
                <GetLinkDisplayIcon link={link} />
                <Typography variant="h6">{link.title}</Typography>
              </Link>
              </Tooltip>
            ) : (
              /* Address does not exist */
              <>
                <GetLinkDisplayIcon link={link} />
                <Typography variant="h6">{link.title}</Typography>
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default DisplayPageLinks;
