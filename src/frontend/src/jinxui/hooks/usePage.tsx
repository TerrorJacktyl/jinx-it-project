import { useContext } from "react";
import {
  PageContext,
  useUser,
  useSection,
  PORTFOLIOS_PATH,
  listDelete,
  listMoveUp,
  listMoveDown,
  listAdd,
} from "jinxui";
import API from "../../API";
import { TPage, TEditPage } from "../types/PortfolioTypes";
import { defaultPageContext } from "jinxui/contexts";
import { v4 as uuidv4, validate } from "uuid";

async function putPage(portfolioId: number, page: TEditPage, config: any) {
  const path =
    PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
  try {
    const response = await API.put(path, page, config);
    return response;
  } catch (e) {
    throw e;
  }
}

async function postPage(portfolioId: number, data: TEditPage, config: any) {
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

async function putPages(
  portfolioId: number,
  pages: TEditPage[],
  updatePages: any,
  saveSections: any,
  config: any
) {
  const basePath = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";
  try {
    const pagesResult = await Promise.all(
      pages.map((page: TEditPage, index: number) => {
        page.number = index;
        if (page.isNew) {
          return API.post(
            basePath,
            { name: page.name, number: page.number },
            config
          )
            .then((response: any) => {
              saveSections(portfolioId, response.data.id, page.uid);
              updatePages(index, { id: response.data.id, isNew: false });

              return response;
            })
            .catch((error: any) => {
              console.log(error);
              throw error;
            });
        } else {
          console.assert(page.id > 0)
          const pagePath = basePath + "/" + page.id;
          return API.put(pagePath, page, config).then(
            (response: any) => {
              saveSections(portfolioId, response.data.id, page.uid);
            }
          );
        }
      })
    );
    return pagesResult;
  } catch (e) {
    throw e;
  }
}

async function postPages(portfolioId: number, pages: TEditPage[], config: any) {
  try {
    const pagesResult = await Promise.all(
      pages.map((page: TEditPage) => {
        const path =
          PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" + page.id;
        return API.post(path, page, config);
      })
    );
    return pagesResult;
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
  const {
    handleSectionDeletePage,
    handleSectionAddPage,
    saveSections,
  } = useSection();

  function pageIndex(pageUid: string) {
    const index = state.findIndex((page: TEditPage) => page.uid === pageUid);
    if (index > -1) {
      return index;
    } else {
      throw Error("Page with id: " + pageUid + " could not be found.");
    }
  }

  async function getPages(portfolioId: number) {
    const path = PORTFOLIOS_PATH + "/" + portfolioId + "/pages";
    const result = API.get(path, getConfig())
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
    return result;
  }

  async function fetchPages(portfolioId: number) {
    try {
      const pages = await getPages(portfolioId);
      for (var page of pages) {
        page.uid = uuidv4();
        page.isNew = false;
      }
      pages.sort((a:TPage, b:TPage) => (a.number > b.number ? 1 : -1));
      await setPages(pages);
      return pages;
    } catch (e) {
      throw e;
    }
  }

  function getFetchedPages() {
    return state;
  }

  function getFetchedPageId(uid: string) {
    for (var page of state) {
      if (page.uid === uid) {
        return page.id;
      }
    }
    return "";
  }

  async function setPages(pages: TEditPage[]) {
    try {
      await setState(pages);
    } catch (e) {
      throw e;
    }
  }

  async function savePage(isNew: boolean, portfolioId: number, index: number) {
    try {
      return isNew
        ? await postPage(portfolioId, state[index], getConfig())
        : await putPage(portfolioId, state[index], getConfig());
    } catch (e) {
      throw e;
    }
  }

  async function savePages(portfolioId: number) {
    try {
      return await putPages(
        portfolioId,
        state,
        updateState,
        saveSections,
        getConfig(),
      );
    } catch (e) {
      throw e;
    }
  }

  function handlePageDelete(index: number) {
    try {
      setState(listDelete(state, index));
      handleSectionDeletePage(state[index].uid);
    } catch (e) {
      throw e;
    }
  }

  function handlePageAdd(index: number) {
    const newPage = JSON.parse(JSON.stringify(defaultPageContext));
    newPage.uid = uuidv4();
    setState(listAdd(state, index, newPage));
    handleSectionAddPage(newPage.uid);
  }

  function resetPages() {
    resetState();
  }

  return {
    fetchPages,
    setPages,
    getFetchedPages,
    getFetchedPageId,
    savePage,
    savePages,
    handlePageDelete,
    handlePageAdd,
    resetPages,
  };
};
