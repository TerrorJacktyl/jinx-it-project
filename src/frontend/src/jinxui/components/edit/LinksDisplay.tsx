import React from "react";

import { useLink, useSection, LinkEditMenu } from "jinxui";

import { TLink } from "jinxui/types";

type TLinksDisplay = {
  pageId?: number;
  sectionUid?: string;
};
const LinksDisplay = (props: TLinksDisplay) => {
  const { getFetchedLinks } = useLink();
  const { getFetchedSectionLinks } = useSection();

  return (
    <>
      {props.pageId && props.sectionUid
        // Display section links
        ? getFetchedSectionLinks(props.pageId, props.sectionUid).map(
            (link: TLink) => {
              return (
                <LinkEditMenu
                  key={link.id}
                  link={link}
                  pageId={props.pageId}
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
