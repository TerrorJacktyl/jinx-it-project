import React, { useState } from "react";
import { TPage } from "jinxui/types";

export const defaultPageContext: TPage = {
  id: 0,
  name: "Home",
  number: 0,
  sections: []
};

export const PageContext = React.createContext<[TPage[], any, any, any]>([
  [],
  () => {},
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
    if (index > state.length-1) {
      setState([...state, {...defaultPageContext,...fieldsToUpdate}])
    } else {
      setState([
        ...state.slice(0, index), 
        {...state[index], ...fieldsToUpdate},
        ...state.slice(index + 1)]);
    }
  };

  const resetState = () => {
    setState([])
  }

  return (
    <PageContext.Provider value={[state, setState, updateState, resetState]}>
      {props.children}
    </PageContext.Provider>
  );
};
