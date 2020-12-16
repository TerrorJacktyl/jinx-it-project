import React, { useState } from "react";
import {TEditSection} from "jinxui/types";
import { v4 as uuidv4 } from "uuid";


export const defaultSectionContext: TEditSection = {
  name: "",
  content: "",
  media: "",
  image: null,
  path: "",
  alt: "",
  id: 0,
  type: "skelaton",
  number: 0,
  uid: uuidv4(),
};



export const SectionContext = React.createContext<[TEditSection[], any, any, any]>([
  [],
  () => {},
  () => {},
  () => {},
]);

type TSectionContextProvider = {
  children: any;
};
export const SectionContextProvider = (props: TSectionContextProvider) => {
  const [state, setState] = useState<TEditSection[]>([]);

  const updateState = (uuid_index: string, fieldsToUpdate: Partial<TEditSection[]>) => {
    const index = state.findIndex(
      (section: TEditSection) => section.uid === uuid_index
    );
    var newSection:TEditSection = {...state[index], ...fieldsToUpdate};
    var newSections:TEditSection[] = state;
    newSections[index] = newSection;
    setState(newSections);
  };

  const resetState = () => {
    setState([]);
  }

  return (
    <SectionContext.Provider value={[state, updateState, setState, resetState]}>
      {props.children}
    </SectionContext.Provider>
  );
};
