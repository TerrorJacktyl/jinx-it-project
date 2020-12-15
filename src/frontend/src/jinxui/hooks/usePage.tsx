import { useContext } from "react";
import { PageContext, useUser } from "jinxui";
import API from "../../API";
import { v4 as uuidv4 } from "uuid";
import { TPage } from "../types/PortfolioTypes";


export const usePage = () => {
  const [state, updateState, setState] = useContext(PageContext);
  const PORTFOLIOS_PATH = "api/portfolios";
  const { getConfig, getSavedPortfolioId } = useUser();


  async function getPages(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    const result = API.get(path, getConfig())
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
    return result;
  }

  async function fetchPages() {
    try {
      const id = getSavedPortfolioId();
      setState(await getPages(id));
    } catch (e) {
      throw e
    }
  }

  async function setPages(pages: TPage[]) {
    try {
      await setState(pages);
    } catch (e) {
      throw e;
    }
  }

  function getSavedPages() {
    return state;
  }

  return {
    fetchPages,
    setPages,
    getSavedPages,
  }
}