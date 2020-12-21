import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import { useTheme } from "@material-ui/core/styles";
import { useLink, useSection, LinkDisplayIcon, LinkIconEnum } from "jinxui";

import { TLink } from "jinxui/types";

/**
 * Run through all the saved links
 * If the link has an address, make it into a clickable link,
 *  otherwise make it a graphic
 * If link has an icon, display it
 */
type TDisplayLinks = {
  horizontalAlign: string;
  sectionId?: number;
};
const DisplayLinks = (props: TDisplayLinks) => {
  const { getFetchedLinks } = useLink();
  const { getFetchedSectionLinksFromId } = useSection();
  const theme = useTheme();
  const links = props.sectionId
    ? getFetchedSectionLinksFromId(props.sectionId)
    : getFetchedLinks();

  type TGetLinkDisplayIcon = {
    link: TLink;
    size: any;
  };
  const GetLinkDisplayIcon = (props: TGetLinkDisplayIcon) => {
    if (props.link.icon && props.link.icon !== LinkIconEnum.Disabled) {
      return <LinkDisplayIcon icon={props.link.icon} size={props.size} />;
    } else {
      return <></>;
    }
  };

  const linksHaveText = () => {
    for (var link of links) {
      if (link.title && link.title !== "") {
        return true;
      }
    }
    return false;
  };

  type TLinkContent = {
    link: TLink;
  };
  const LinkContent = (props: TLinkContent) => {
    const size = linksHaveText()
      ? theme.typography.h3.fontSize
      : theme.typography.h1.fontSize;
    return (
      <Box display="flex" alignItems="center">
        <GetLinkDisplayIcon link={props.link} size={size} />
        <Box width="15px" />
        <Typography variant="h6">{props.link.title}</Typography>
      </Box>
    );
  };

  const direction = linksHaveText() ? "column" : "row";
  return (
    <>
      <Box display="flex" justifyContent={props.horizontalAlign}>
        <Box
          display="flex"
          width="max-content"
          flexDirection={direction}
          alignItems="baseline"
        >
          {links.map((link: TLink) => {
            return (
              <Box key={link.id} marginTop="15px">
                {link.address && link.address !== "" ? (
                  /* Address exists */
                  <Tooltip title={link.address}>
                    <Link
                      href={link.address}
                      color="textPrimary"
                      underline="none"
                    >
                      <LinkContent link={link} />
                    </Link>
                  </Tooltip>
                ) : (
                  /* Address does not exist */
                  <>
                    <LinkContent link={link} />
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

export default DisplayLinks;
