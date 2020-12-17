import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

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
      return <LinkDisplayIcon icon={props.link.icon} />;
    } else {
      return <></>;
    }
  };

  // useEffect(() => {
  const linksHaveText = () => {
    for (var link of getFetchedLinks()) {
      if (link.title && link.title !== "") {
        return true;
      }
    }
    return false;
  };
  // }, []);

  const direction = linksHaveText() ? "column" : "row";
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          width="max-content"
          flexDirection={direction}
          alignItems="baseline"
        >
          {getFetchedLinks().map((link: TLinkData) => {
            return (
              <Box key={link.id} margin="15px">
                {link.address && link.address !== "" ? (
                  /* Address exists */
                  <Tooltip title={link.address}>
                    <Link
                      href={link.address}
                      color="textPrimary"
                      underline="none"
                    >
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
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default DisplayPageLinks;
