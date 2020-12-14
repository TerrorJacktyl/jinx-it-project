import React, { useState } from "react";
import {TPortfolio} from "jinxui/types";


// export interface TPortfolio {
//   id: number;
//   owner: number;
//   name: string;
//   pages: number[];
//   theme: string;
//   background: string;
// };// | null;

export const defaultPortfolioContext: TPortfolio = {
  id: 0,
  owner: 0,
  name: "",
  pages: [],
  theme: "",
  background: ""
}

export const PortfolioContext = React.createContext<[TPortfolio, any, any]>([
  defaultPortfolioContext,
  () => {},
  () => {},
]);

export const PortfolioContextProvider = (props: any) => {
  const [state, setState] = useState<TPortfolio>(defaultPortfolioContext)

  const updateState = (fieldsToUpdate: Partial<TPortfolio>) => {
    setState((state) => { return {...state, ...fieldsToUpdate} });
    return;
  }

  const resetState = () => {
    setState(defaultPortfolioContext);
  }

  return (
    <PortfolioContext.Provider value={[state, updateState, resetState]}>
      {props.children}
    </PortfolioContext.Provider>
  );
};


