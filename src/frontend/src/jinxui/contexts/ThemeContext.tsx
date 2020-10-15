import React, { useState } from "react";
import { IThemeContext } from "jinxui";


const THEME_DATA_KEY = "themeData"

export const defaultThemeContext: IThemeContext = {
  lightThemeMode: true
}

export const ThemeContext = React.createContext<[IThemeContext, any]>([defaultThemeContext, () => { }]);

export function retrieveThemeData(): (IThemeContext | null) {
  const storedString = localStorage.getItem(THEME_DATA_KEY);
  return storedString ?  JSON.parse(storedString) : null
}


export const ThemeContextProvider = (props: any) => {

  const localData = retrieveThemeData();

  const [state, switchState] = useState<IThemeContext> (
    localData ? localData : defaultThemeContext
  )

  return(
    <ThemeContext.Provider value={[state, switchState]}>
      {props.children}
    </ThemeContext.Provider>
  )
}