import { useContext } from "react";
import { PageContext, useUser, PORTFOLIOS_PATH } from "jinxui";
import API from "../../API";
import { TPage } from "../types/PortfolioTypes";

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

async function putPages(portfolioId: number, pages: TPage[], config: any) {
  try {
    const pagesResult = await Promise.all(
      pages.map((page: TPage) => {
        const path =
          PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
        return API.put(path, page, config);
      })
    );
    return pagesResult
  } catch (e) {
    throw e;
  }
}

async function postPages(portfolioId: number, pages: TPage[], config: any) {
  try {
    const pagesResult = await Promise.all(
      pages.map((page: TPage) => {
        const path =
          PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
        return API.post(path, page, config);
      })
    );
    return pagesResult
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

  async function savePage(isNew: boolean, portfolio_id: number, index: number) {
    try {
      return isNew
        ? await postPage(portfolio_id, state[index], getConfig())
        : await putPage(portfolio_id, state[index], getConfig());
    } catch (e) {
      throw e;
    }
  }

  async function savePages(isNew: boolean, portfolio_id: number) {
    try {
      return isNew
        ? await postPages(portfolio_id, state, getConfig())
        : await putPages(portfolio_id, state, getConfig());
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
    savePages,
    resetPages,
  };
};
