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

interface TEditSections {
  [pageId: number]: TEditSection[]
}

export const SectionContext = React.createContext<
  [TEditSection[], any, any, any]
>([[], () => {}, () => {}, () => {}]);

type TSectionContextProvider = {
  children: any;
};
export const SectionContextProvider = (props: TSectionContextProvider) => {
  const [state, setState] = useState<TEditSection[]>([]);
  

  const section1:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  const section2:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  const section3:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  const section4:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  const section5:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  const section6:TEditSection = JSON.parse(JSON.stringify(defaultSectionContext));
  section6.name = "test";

  var allSections:TEditSections = {
    6: [section1, section2],
    7: [section3],
    8: [section4, section5]
  }

  allSections = {...allSections, 8: [{...section6, path: "path/to/something"}] }
  console.log(allSections)








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
