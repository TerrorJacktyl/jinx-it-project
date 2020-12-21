import React from "react";

import { useLink, useSection, LinkEditMenu } from "jinxui";

import { TLink, } from "jinxui/types";

type TLinksDisplay = {
  sectionUid?: string;
};
const LinksDisplay = (props: TLinksDisplay) => {
  const { getFetchedLinks } = useLink();
  const { getFetchedSectionLinks, } = useSection();
  const links = props.sectionUid
    ? getFetchedSectionLinks(props.sectionUid)
    : getFetchedLinks();
  
  return (
    <>
      {links.map((link: TLink) => {
          return (
            <LinkEditMenu
              key={link.id}
              link={link}
              sectionUid={props.sectionUid}
            />
          );
      })}
    </>
  );
};

export default LinksDisplay;
