import React from "react";

import { useLink, useSection, LinkEditMenu } from "jinxui";

import { TLink } from "jinxui/types";

type TLinksDisplay = {
  pageUid?: string;
  sectionUid?: string;
};
const LinksDisplay = (props: TLinksDisplay) => {
  const { getFetchedLinks } = useLink();
  const { getFetchedSectionLinks } = useSection();

  return (
    <>
      {props.pageUid && props.sectionUid
        // Display section links
        ? getFetchedSectionLinks(props.pageUid, props.sectionUid).map(
            (link: TLink) => {
              return (
                <LinkEditMenu
                  key={link.id}
                  link={link}
                  pageUid={props.pageUid}
                  sectionUid={props.sectionUid}
                />
              );
            }
          )
        : getFetchedLinks().map((link: TLink) => {
          // Display page links
            return <LinkEditMenu key={link.id} link={link} />;
          })}
    </>
  );
};

export default LinksDisplay;
