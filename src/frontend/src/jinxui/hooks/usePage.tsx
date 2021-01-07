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
import { v4 as uuidv4 } from "uuid";

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
        sections: data.sections,
      },
      config
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function deletePage(portfolioId: number, pageId: number, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages/" 
    + pageId.toString();
  try {
    const response = await API.delete(path, config)
    return response.data;
  } catch(e) {
    throw e;
  }
}

async function putPages(
  portfolioId: number,
  pages: TEditPage[],
  saveSections: any,
  config: any
) {
  const basePath = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";
  try {
    // const pagesResult = await Promise.all(
      // pages.map((page: TEditPage, index: number) => {
      const pagesResult = pages.map((page: TEditPage, index: number) => {
        page.number = index;
        console.assert(page.id > 0);
        const pagePath = basePath + "/" + page.id;
        return API.put(pagePath, page, config).then((response: any) => {
          saveSections(portfolioId, response.data.id, page.uid);
        });
      });
    // );
    return pagesResult;
  } catch (e) {
    throw e;
  }
}

async function deleteOldPages(
  portfolioId: number,
  pages: TEditPage[],
  config: any
) {
  try {
    const basePath = PORTFOLIOS_PATH + "/" + portfolioId.toString() + "/pages";

    getPages(portfolioId, config).then((response: any) => {
      const pagesToDelete = response.filter((responsePage: TPage) => {
        return !pages.some((page) => page.id === responsePage.id);
      });
      const promiseResult = Promise.all(
        pagesToDelete.map((pageToDelete: TPage) => {
          const deletePath = basePath + "/" + pageToDelete.id;
          const deleteResult = API.delete(deletePath, config);
          return deleteResult;
        })
      );
      return promiseResult;
    });
  } catch (e) {
    throw e;
  }
}

async function getPages(portfolioId: number, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolioId + "/pages";
  const result = API.get(path, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
  return result;
}

export const usePage = () => {
  // Update state will be useful when using multiple pages
  // eslint-disable-next-line
  const [state, setState, updateState, resetState] = useContext(PageContext);
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

  async function fetchPages(portfolioId: number) {
    try {
      const pages = await getPages(portfolioId, getConfig());
      for (var page of pages) {
        page.uid = uuidv4();
        page.isNew = false;
      }
      pages.sort((a: TPage, b: TPage) => (a.number > b.number ? 1 : -1));
      await setPages(pages);
      return pages;
    } catch (e) {
      throw e;
    }
  }

  function getFetchedPages() {
    return state;
  }

  function getPagesIndexedCopy() {
    const pages = JSON.parse(JSON.stringify(state));
    for (var i = 0; i < pages.length; i++) {
      pages[i].number = i
    }
    return pages
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

  async function handlePageDelete(portfolioId: number, index: number) {
    try {
      await deletePage(portfolioId, state[index].id, getConfig())
    } catch (e) {
      throw e;
    }
    try {
      setState(listDelete(state, index));
      handleSectionDeletePage(state[index].uid);
    } catch (e) {
      throw e;
    }
  }

  async function handlePageAdd(portfolioId: number, index: number, ) {
    const newPage = JSON.parse(JSON.stringify(defaultPageContext));
    const postedPage = await postPage(portfolioId, newPage, getConfig());
    postedPage.uid = uuidv4();
    setState(listAdd(state, index, postedPage));
    handleSectionAddPage(postedPage.uid);
  }

  function handlePageMoveUp(index: number) {
    try {
      setState(listMoveUp(state, index));
    } catch (e) {
      throw e;
    }
  }

  function handlePageMoveDown(index: number) {
    try {
      setState(listMoveDown(state, index));
    } catch (e) {
      throw e;
    }
  }

  function resetPages() {
    resetState();
  }

  return {
    pageIndex,
    fetchPages,
    setPages,
    getFetchedPages,
    getPagesIndexedCopy,
    getFetchedPageId,
    savePage,
    // savePages,
    handlePageDelete,
    handlePageAdd,
    handlePageMoveUp,
    handlePageMoveDown,
    resetPages,
  };
};
