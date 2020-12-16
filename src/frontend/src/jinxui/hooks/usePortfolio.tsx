import { useContext, useState, useEffect } from "react";
import {
  PortfolioContext,
  useUser,
  useSection,
  useLink,
  usePage,
  LightTheme,
  DarkTheme,
} from "jinxui";
import API from "../../API";
import { TPortfolio } from "../types/PortfolioTypes";
import { createMuiTheme } from "@material-ui/core/styles";


export const usePortfolio = () => {
  const [state, updateState] = useContext(PortfolioContext);
  const [portfolioIsSaving, setSaving] = useState(false);
  const {
    getConfig,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    sendFullPortfolio,
  } = useUser();
  const { getFetchedPages } = usePage();
  const { getFetchedSections, getCleanedSections } = useSection();
  const { getFetchedLinks } = useLink();

  const portfolioExists = true;

  const PORTFOLIOS_PATH = "api/portfolios";



  async function fetchPortfolio() {
    setSaving(true)
    try {
      const portfolioDetails = await getPortfolio(getSavedPortfolioId());
      const stateChanges: TPortfolio = {
        id: portfolioDetails.id,
        owner: portfolioDetails.owner,
        name: portfolioDetails.name,
        pages: portfolioDetails.pages,
        private: portfolioDetails.private,
        theme: portfolioDetails.theme,
        background: portfolioDetails.string,
      };

      await updateState(stateChanges);

      return state;
    } catch (e) {
      throw e;
    }
  }

  function portfolioIsFetched() {
    return(state.id>0)
  }

  function getFetchedPortfolio() {
    return state;
  }

  async function getPortfolio(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    const result = API.get(path, getConfig())
      .then((response: any) => response.data)
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  function getLightTheme() {
    return createMuiTheme(getSavedLightThemeMode() ? LightTheme : DarkTheme);
  }

  function setPortfolioName(name: string) {
    updateState({ name: name });
  }

  async function setPortfolioTheme(portfolio_id: number, theme_name: string) {
    async function savePortfolioTheme(theme: string) {
      try {
        await updateState({
          ...state,
          theme: theme,
        });
      } catch (e) {
        throw e;
      }
    }

    const path = PORTFOLIOS_PATH + "/" + portfolio_id;
    API.get(path, getConfig())
      .then((response: any) => {
        const result = API.put(
          path,
          {
            name: response.data.name,
            theme: theme_name,
          },
          getConfig()
        )
          .then((response: any) => {
            savePortfolioTheme(response.data.theme);
          })
          .catch((error: any) => {
            console.log(error);
            throw error;
          });
        return result;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
  }

  async function setPortfolio(portfolio: TPortfolio) {
    try {
      await updateState(portfolio);
    } catch (e) {
      throw e;
    }
  }

  async function saveFullPortfolio() {
    if (state){
        setSaving(true);
      const result = sendFullPortfolio(
        state,
        getFetchedPages(),
        getCleanedSections(),
        getFetchedLinks(),
        portfolioExists
      )
        .then((response: any) => {
          setSaving(false);
          return response.data;
        })
        .catch((e) => {
          setSaving(false);
          throw e;
        });
      return result;
    }
  }

  return {
    portfolioData: state,
    fetchPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    setPortfolioName,
    setPortfolioTheme,
    setPortfolio,
    saveFullPortfolio,
    portfolioIsSaving,
    portfolioIsFetched,
  };
};
