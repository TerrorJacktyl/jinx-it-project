import React, { useEffect, useState } from "react";

import {
  useLink,
  LinkEditMenu,
} from "jinxui";

import {
  TLinkData,
} from "jinxui/types";


const LinksDisplay = () => {
  const { getFetchedLinks } = useLink();
  
  return (
    <>
      {getFetchedLinks().map((link: TLinkData) => {
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