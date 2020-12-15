import React, { useState } from "react";
import { TPage } from "jinxui/types";

export const defaultPageContext: TPage = {
  id: 0,
  name: "Home",
  number: 0,
  sections: []
};

export const PageContext = React.createContext<[TPage[], any, any]>([
  [],
  () => {},
  () => {},
]);

type TPageContextProvider = {
  children: any;
};
export const PageContextProvider = (props: TPageContextProvider) => {
  const [state, setState] = useState<TPage[]>([]);

  const updateState = (
    index: number,
    fieldsToUpdate: Partial<TPage[]>
  ) => {
    var newPage: TPage = { ...state[index], ...fieldsToUpdate };
    var newPages: TPage[] = state;
    newPages[index] = newPage;
    setState(newPages);
  };

  return (
    <PageContext.Provider value={[state, updateState, setState]}>
      {props.children}
    </PageContext.Provider>
  );
};
