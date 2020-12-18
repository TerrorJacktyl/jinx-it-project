import React, { useState } from "react";
import { TLink } from "jinxui/types";
import { v4 as uuidv4, validate } from "uuid";
import { LinkIconEnum } from "jinxui"

export const defaultLinkContext: TLink = {
  title: "",
  address: "",
  icon: LinkIconEnum.Disabled,
  id: "",
  number: 0,
};

export const LinkContext = React.createContext<[TLink[], any, any, any]>([
  [],
  () => {},
  () => {},
  () => {},
]);

type TLinkContextProvider = {
  children: any;
};
export const LinkContextProvider = (props: TLinkContextProvider) => {
  const [state, setState] = useState<TLink[]>([]);

  const updateState = (
    uuid_index: string,
    fieldsToUpdate: Partial<TLink[]>
  ) => {
    // Check if id exists
    const index = state.findIndex(
      (link: TLink) => link.id === uuid_index
    );    
    if (index > -1) {   // Link exists
      var newLink: TLink = { 
        ...state[index], 
        ...fieldsToUpdate, 
      }
      setState([...state.slice(0, index), newLink, ...state.slice(index+1)]);
    } else {            // New link required
      const newLink:TLink = {
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
