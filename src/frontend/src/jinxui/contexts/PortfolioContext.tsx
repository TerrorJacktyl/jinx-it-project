import React, { useState } from "react";
import {
  TPortfolio,
} from "jinxui/types";

export const defaultPortfolioContext: TPortfolio = {
  id: 0,
  owner: 0,
  name: "",
  pages: [],
  private: true,
  theme: "",
  background: ""
}

export const PortfolioContext = React.createContext<[TPortfolio, any,]>([
  defaultPortfolioContext,
  () => {},
]);

type TPortfolioContextProvider = {
  children: any;
};
export const PortfolioContextProvider = (props: TPortfolioContextProvider) => {
  const [state, setState] = useState<TPortfolio>(defaultPortfolioContext);

  const updateState = (fieldsToUpdate: Partial<TPortfolio>) => {
    // setState((state) => { return {...state, ...fieldsToUpdate} });
    setState({...state, ...fieldsToUpdate})
    return;
  }

  return (
    <PortfolioContext.Provider value={[state, updateState]}>
      {props.children}
    </PortfolioContext.Provider>
  );
};


