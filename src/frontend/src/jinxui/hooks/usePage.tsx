import { useContext } from "react";
import { PageContext, useUser, PORTFOLIOS_PATH } from "jinxui";
import API from "../../API";
import { TPage } from "../types/PortfolioTypes";

async function postPage(portfolioId: number, data: TPage, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";
  try {
    const response = await API.post(
      path,
      {
        name: data.name,
        number: data.number,
      },
      config
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function putPage(portfolioId: number, page: TPage, config: any) {
  const path =
    PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
  try {
    const response = await API.put(path, page, config);
    return response;
  } catch (e) {
    throw e;
  }
}


export const usePage = () => {
  // Update state will be useful when using multiple pages
  // eslint-disable-next-line
  const [state, setState, updateState, resetState] = useContext(PageContext);
  const PORTFOLIOS_PATH = "api/portfolios";
  const { getConfig } = useUser();

  async function getPages(portfolio_id: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolio_id + "/pages";
    const result = API.get(path, getConfig())
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
    return result;
  }

  async function fetchPages(id: number) {
    try {
      const pages = await getPages(id);
      // setState(pages);
      await setPages(pages);
      return pages;
    } catch (e) {
      throw e;
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

  async function savePage(isNew: boolean, portfolio_id: number) {
    try {
      return isNew
        ? await postPage(portfolio_id, state[0], getConfig())
        : await putPage(portfolio_id, state[0], getConfig());
    } catch (e) {
      throw e;
    }
  }

  function resetPages() {
    resetState();
  }

  return {
    fetchPages,
    setPages,
    getFetchedPages,
    savePage,
    resetPages,
  };
}