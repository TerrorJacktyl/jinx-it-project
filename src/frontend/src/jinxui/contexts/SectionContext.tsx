import React, { useState } from "react";
import { TEditSection } from "jinxui/types";
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
  [TEditSection[], any, any, any]
>([[], () => {}, () => {}, () => {}]);

type TSectionContextProvider = {
  children: any;
};
export const SectionContextProvider = (props: TSectionContextProvider) => {
  const [state, setState] = useState<TEditSection[]>([]);

  const updateState = (
    uuid_index: string,
    fieldsToUpdate: Partial<TEditSection[]>
  ) => {
    const index = state.findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    setState([
      ...state.slice(0, index),
      { ...state[index], ...fieldsToUpdate },
      ...state.slice(index + 1),
    ]);
  };

  const resetState = () => {
    setState([]);
  };

  return (
    <SectionContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </SectionContext.Provider>
  );
};
