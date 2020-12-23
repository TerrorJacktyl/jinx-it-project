import React, { useState } from "react";
import { TEditSection, TEditSections } from "jinxui/types";
import { v4 as uuidv4 } from "uuid";

export const defaultSectionContext: TEditSection = {
  name: "",
  content: "",
  media: "",
  image: null,
  path: "",
  alt: "",
  id: 0,
  type: "skeleton",
  number: 0,
  uid: uuidv4(),
  links: [],
};



export const SectionContext = React.createContext<
  [any, any, any, any]
>([[], () => {}, () => {}, () => {}]);

type TSectionContextProvider = {
  children: any;
};
export const SectionContextProvider = (props: TSectionContextProvider) => {
  const [state, setState] = useState<TEditSections>({});

  const updateState = (
    pageId: string,
    uuid_index: string,
    fieldsToUpdate: Partial<TEditSection[]>
  ) => {
    const index = state[pageId].findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    setState({
      ...state,
        [pageId]: [
          ...state[pageId].slice(0, index),
          { ...state[pageId][index], ...fieldsToUpdate },
          ...state[pageId].slice(index + 1)]
      });
  };

  const resetState = () => {
    setState({});
  };

  return (
    <SectionContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </SectionContext.Provider>
  );
};
