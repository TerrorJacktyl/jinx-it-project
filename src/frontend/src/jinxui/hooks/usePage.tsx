import { useContext, useState } from "react";
import { PageContext, useUser } from "jinxui";
import API from "../../API";
import { TPage } from "../types/PortfolioTypes";


export const usePage = () => {
  const [state, updateState, setState] = useContext(PageContext);
  
  // Error and success message for a single page in edit mode
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  function getFetchedPages() {
    return state;
  }

  async function setPages(pages: TPage[]) {
    try {
      await setState(pages);
    } catch (e) {
      throw e;
    }
  }

  return {
    fetchPages,
    setPages,
    getFetchedPages,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage
  };
}