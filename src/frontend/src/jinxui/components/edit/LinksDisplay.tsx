import React from "react";

import {
  useLink,
  LinkEditMenu,
} from "jinxui";

import {
  TLink,
} from "jinxui/types";


const LinksDisplay = () => {
  const { getFetchedLinks } = useLink();
  
  return (
    <>
      {getFetchedLinks().map((link: TLink) => {
        if (link) {
          return (
            <LinkEditMenu
              key={link.id}
              link={link}
            />
          );
        }
      })}
    </>
  );
};

export default LinksDisplay