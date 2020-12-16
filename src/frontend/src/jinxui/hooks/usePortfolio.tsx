import { useContext, useState } from "react";
import {
  PortfolioContext,
  useUser,
  useSection,
  useLink,
  usePage,
  LightTheme,
  DarkTheme,
  PORTFOLIOS_PATH,
} from "jinxui";
import API from "../../API";
import { TPortfolio, TPortfolioData } from "../types/PortfolioTypes";
import { createMuiTheme } from "@material-ui/core/styles";

async function changePortfolioPrivacy(
  portfolio_id: number,
  privacy: boolean,
  config: any
) {
  const path = PORTFOLIOS_PATH + "/" + portfolio_id;
  API.get(path, config)
    .then((response: any) => {
      const result = API.put(
        path,
        {
          name: response.data.name,
          private: privacy,
        },
        config
      ).catch((error: any) => {
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

// Note the $s in the function name. Use this if you want to get all of a user's portfolios
async function getPortfolios(config: any) {
  const path = PORTFOLIOS_PATH;
  const result = API.get(path, config).then((response: any) => response.data);
  return result;
}

// Use this if you want to get a specific portfolio
async function getPortfolio(portfolio_id: number, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolio_id.toString();
  const result = API.get(path, config)
    .then((response: any) => response.data)
    .catch((error: any) => {
      console.log(error);
      throw error;
    });
  return result;
}

async function postPortfolio(data: TPortfolioData, config: any) {
  if (!data) {
    throw "Portfolio data is null";
  }
  try {
    const response = await API.post(
      PORTFOLIOS_PATH,
      {
        name: data.name,
      },
      config
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

async function putPortfolio(portfolio: any, config: any) {
  const path = PORTFOLIOS_PATH + "/" + portfolio.id;
  try {
    const response = API.put(path, portfolio, config);
    return response;
  } catch (e) {
    throw e;
  }
}

export const usePortfolio = () => {
  const [state, updateState] = useContext(PortfolioContext);
  // const [portfolioIsSaving, setSaving] = useState(false);
  const {
    getConfig,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    setSaving,
  } = useUser();
  const { fetchPages, getFetchedPages, savePage } = usePage();
  const { fetchSections, getCleanedSections, saveSections } = useSection();
  const { fetchPageLinks, getFetchedLinks, saveLinks } = useLink();

  const portfolioExists = true;

  const PORTFOLIOS_PATH = "api/portfolios";

  // async function getFullPortfolio(portfolio_id: number) {
  //   try {
  //     const portfolio: TPortfolio = await getPortfolio(portfolio_id);
  //     const pages: TPage[] = await getPages(portfolio_id);
  //     const links: TLinkData[] = await getPageLinks(portfolio_id, pages[0].id);
  //     // Define as TSection[][] = [] and uncomment forEach loop when incorporating multiple pages
  //     const sections: TSection[] = await getSections(portfolio_id, pages[0].id);
  //     //        pages.forEach(async (page: any) => {
  //     //          sections.push(await getSections(portfolio_id, page.id))
  //     //        })
  //     // console.log(sections);
  //     return { portfolio, pages, sections, links };
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  async function fetchPortfolio() {
    try {
      const portfolioDetails: TPortfolio = await getPortfolio(
        getSavedPortfolioId(),
        getConfig()
      );
      await updateState(portfolioDetails);

      return portfolioDetails;
    } catch (e) {
      throw e;
    }
  }

  /* Will retrieve a portoflio, all of its pages, and the first page's sections.
     Tried to incorporate functionality to fetch all sections corresponding to all pages,
     but ran into a very lame bug with nested list indexing :'( */
  async function fetchFullPortfolio() {
    try {
      await fetchPortfolio();
      const pages = await fetchPages();
      if (pages.length < 1) {
        throw "No pages found for portfolio";
      }
      await fetchSections(pages[0].id);
      await fetchPageLinks(pages[0].id);
    } catch (e) {
      throw e;
    }
  }

  function portfolioIsFetched() {
    return state.id > 0;
  }

  function getFetchedPortfolio() {
    return state;
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

  async function savePortfolio(isNew: boolean) {
    try {
      return isNew
        ? await postPortfolio(state, getConfig())
        : await putPortfolio(state, getConfig());
    } catch (e) {
      throw e;
    }
  }

  async function saveFullPortfolio(isNew: boolean) {
    setSaving(true)
    if (state) {
      try {
        const portfolioResponse = await savePortfolio(isNew);
        const pageResponse = await savePage(isNew, portfolioResponse.data.id);
        await saveSections(
          isNew,
          portfolioResponse.data.id,
          pageResponse.data.id
        );
        await saveLinks(portfolioResponse.data.id, pageResponse.data.id);
      } catch (e) {
        throw e;
      } finally {
        setSaving(false);
      }
    }
  }

  async function makePortfolioPublic(portfolio_id: number) {
    return changePortfolioPrivacy(portfolio_id, false, getConfig());
  }

  async function makePortfolioPrivate(portfolio_id: number) {
    return changePortfolioPrivacy(portfolio_id, true, getConfig());
  }

  return {
    portfolioData: state,
    fetchFullPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    setPortfolioName,
    setPortfolioTheme,
    setPortfolio,
    saveFullPortfolio,
    makePortfolioPublic,
    makePortfolioPrivate,
    portfolioIsFetched,
  };
};
