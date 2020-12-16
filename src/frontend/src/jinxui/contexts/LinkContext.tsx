import React, { useState } from "react";
import { TLinkData } from "jinxui/types";
import { v4 as uuidv4 } from "uuid";

export const defaultLinkContext: TLinkData = {
  title: "",
  address: "",
  icon: "None",
  id: uuidv4(),
};

export const LinkContext = React.createContext<[TLinkData[], any, any, any]>([
  [],
  () => {},
  () => {},
  () => {},
]);

type TLinkContextProvider = {
  children: any;
};
export const LinkContextProvider = (props: TLinkContextProvider) => {
  const [state, setState] = useState<TLinkData[]>([]);

  const updateState = (
    uuid_index: string,
    fieldsToUpdate: Partial<TLinkData[]>
  ) => {
    const index = state.findIndex(
      (link: TLinkData) => link.id === uuid_index
    );
    if (index > -1) {

      var newLink: TLinkData = { ...state[index], ...fieldsToUpdate };
      var newLinks: TLinkData[] = state;
      newLinks[index] = newLink;
      setState(newLinks);
    } else {
      const newLink:TLinkData = {...defaultLinkContext, ...fieldsToUpdate}


      setState([...state, newLink])
    }
  };

  const resetState = () => {
    setState([]);
  }

  return (
    <LinkContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </LinkContext.Provider>
  );
};
