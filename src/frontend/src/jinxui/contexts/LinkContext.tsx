import React, { useState } from "react";
import { TLinkData } from "jinxui/types";
import { v4 as uuidv4, validate } from "uuid";

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
    // Check if id exists
    const index = state.findIndex(
      (link: TLinkData) => link.id === uuid_index
    );    
    if (index > -1) {   // Link exists
      var newLink: TLinkData = { 
        ...state[index], 
        ...fieldsToUpdate, 
      }
      setState([...state.slice(0, index), newLink, ...state.slice(index+1)]);
    } else {            // New link required
      const newLink:TLinkData = {
        ...defaultLinkContext, 
        ...fieldsToUpdate,
        // Add link if a correct one hasn't been provided
        id: validate(uuid_index) ? uuid_index : uuidv4()
      };
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
