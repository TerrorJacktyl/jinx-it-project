import { useContext } from "react";
import { PortfolioContext, useUser } from "jinxui";
import API from "../../API";
import {
  TPortfolio,
} from "../types/PortfolioTypes";


export const usePortfolio = () => {
  const [state, updateState, resetState] = useContext(PortfolioContext);
  const PORTFOLIOS_PATH = "api/portfolios";

  const { getConfig, getSavedPortfolioId } = useUser();

  async function fetchPortfolio() {
    try {
      const portfolioDetails = await getPortfolio(getSavedPortfolioId());

      const stateChanges = {
        id: portfolioDetails.id,
        owner: portfolioDetails.owner,
        name: portfolioDetails.name,
        pages: portfolioDetails.pages,
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

  return {
    portfolioData: state,
    fetchPortfolio,
    getSavedPortfolio,
    updateState,
    resetState,
  };
};
