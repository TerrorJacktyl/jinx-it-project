import React from "react";

import {
  useLink,
  useSection,
  LinkEditMenu,
} from "jinxui";

import {
  TLink,
  TEditSection
} from "jinxui/types";

type TLinksDisplay = {
  sectionUid?: string
  // section?: TEditSection
}
const LinksDisplay = (props: TLinksDisplay) => {
  const { getFetchedLinks } = useLink();
  const { getFetchedSectionLinks, getFetchedSections } = useSection();
  const links = props.sectionUid 
    ? getFetchedSectionLinks(props.sectionUid) 
    // ? getFetchedSections()[0].links
    : getFetchedLinks();

  return (
    <>
      {props.sectionUid ? (
        <>
          {links.map((link: TLink) => {
            if (link) {
              return (
                <LinkEditMenu
                  key={link.id}
                  link={link}
                  sectionUid={props.sectionUid}
                />
              );
            }
          })}
        </>
      ) : (
        <>
          {links.map((link: TLink) => {
            if (link) {
              return (
                <LinkEditMenu
                  key={link.id}
                  link={link}
                  sectionUid={props.sectionUid}
                />
              );
            }
          })}
        </>
      )}
      {/* {links.map((link: TLink) => {
        if (link) {
          return (
            <LinkEditMenu
              key={link.id}
              link={link}
              sectionUid={props.sectionUid}
            />
          );
        }
      })} */}
    </>
  );
};

export default LinksDisplay