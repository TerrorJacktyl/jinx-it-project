import { useContext, useState } from "react";
import { PortfolioContext, defaultPortfolioContext, useUser } from "jinxui";
import API from "../../API";
import { TPortfolio } from "../types/PortfolioTypes";

export const usePortfolio = () => {
  // const [state, setState,] = useContext(PortfolioContext);
  const [state, updateState] = useContext(PortfolioContext);

  const PORTFOLIOS_PATH = "api/portfolios";

  const { getConfig, getSavedPortfolioId } = useUser();

  async function fetchPortfolio() {
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

  function getSavedPortfolio() {
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

  function setPortfolioName(name: string) {
    updateState({name: name});
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
      await updateState(portfolio)
    } catch (e) {
      throw e;
    }
  }

  return {
    portfolioData: state,
    fetchPortfolio,
    getSavedPortfolio,
    setPortfolioName,
    setPortfolioTheme,
    setPortfolio,
  };
};
