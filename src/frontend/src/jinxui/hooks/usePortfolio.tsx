import { useContext } from "react";
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
import { TPortfolio, TPortfolioData, TEditPage, TEditSections, TEditSection } from "../types/PortfolioTypes";
import { createMuiTheme } from "@material-ui/core/styles";

async function changePortfolioPrivacy(
  portfolio_id: number,
  privacy: boolean,
  config: any,
  updateState: any
) {
  const path = PORTFOLIOS_PATH + "/" + portfolio_id;
  const outerResult = API.get(path, config)
    .then((response: any) => {
      const result = API.put(
        path,
        {
          name: response.data.name,
          private: privacy,
        },
        config
      )
        .then((response: any) => {
          updateState({ private: response.data.private });
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
  return outerResult;
}

// Note the $s in the function name. Use this if you want to get all of a user's portfolios
// eslint-disable-next-line
async function getPortfolios(config: any) {
  const path = PORTFOLIOS_PATH;
  const result = await API.get(path, config).then(
    (response: any) => response.data
  );
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
    throw Error("Portfolio data is null");
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
  // Error and success message for a single page in edit mode
  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [state, updateState, resetState] = useContext(PortfolioContext);
  const {
    getConfig,
    getSavedPortfolioId,
    getSavedLightThemeMode,
    getAccountDetailsFromUsername,
    setSaving,
    setErrorMessage,
    setSuccessMessage,
  } = useUser();
  const { fetchPages, savePages, resetPages, getIndexedFetchedPages } = usePage();
  const { fetchSectionsAll, resetSections, getFetchedSectionsAll, getSectionsCopyIndexedAll } = useSection();
  const { fetchPortfolioLinks, savePortfolioLinks, resetPortfolioLinks, getFetchedPortfolioLinks } = useLink();

  const PORTFOLIOS_PATH = "api/portfolios";

  async function fetchPortfolio(id: number) {
    try {
      const portfolioDetails: TPortfolio = await getPortfolio(id, getConfig());
      await updateState(portfolioDetails);

      return portfolioDetails;
    } catch (e) {
      throw e;
    }
  }

  /* Will retrieve a portoflio, all of its pages, and the first page's sections.
     Tried to incorporate functionality to fetch all sections corresponding to all pages,
     but ran into a very lame bug with nested list indexing :'( */
  async function fetchFullPortfolio(username?: string) {
    try {
      const portfolioId = username
        ? (await getAccountDetailsFromUsername(username)).primary_portfolio
        : getSavedPortfolioId();

      // Run symultanious get requests for speed
      // eslint-disable-next-line
      const [_, pages] = await Promise.all([
        fetchPortfolio(portfolioId),
        fetchPages(portfolioId),
      ]);
      if (pages.length < 1) {
        throw Error("No pages found for portfolio");
      }

      await Promise.all([
        fetchSectionsAll(portfolioId, pages),
        fetchPortfolioLinks(portfolioId),
      ]);
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

  function isPrivate() {
    return state.private;
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
    setSaving(true);
    // if (state) {
    //   try {
    //     const portfolioResponse = await savePortfolio(isNew);
    //     await Promise.all([
    //       savePages(portfolioResponse.data.id),
    //       savePortfolioLinks(portfolioResponse.data.id)
    //     ]);
    //     await setSuccessMessage("Portfolio saved");
    //   } catch (e) {
    //     setErrorMessage("Something went wrong");
    //     throw e;
    //   } finally {
    //     setSaving(false);
    //   }
    // }
    if (state) {
      try {
        const portfolioResponse = await savePortfolio(isNew);
        // const oldPages1 = getFetchedPages();
        const oldPages = getIndexedFetchedPages()
        // const oldSections:TEditSections = await getFetchedSectionsIndexedAll();

        const pages = JSON.parse(JSON.stringify(oldPages))
        // const allSections = JSON.parse(JSON.stringify(oldSections))
        const allSections = getSectionsCopyIndexedAll();

        // // const sections:TEditSections = JSON.parse(JSON.stringify(getFetchedSections(portfolioResponse.data.id)))

        for(var page of pages) {
          page.sections = allSections[page.uid]
        }

        // for (var page_index = 0; page_index < pages.length; page_index++) {
        //   const sections = allSections[pages[page_index].uid]
        //   for (var section_index = 0; )
        //   pages[page_index].sections = sections
        // }

        console.log(oldPages)
        console.log(pages)

        const singlePage = pages[0]
        const singleSection = allSections[pages[0].uid][0];
        const path = PORTFOLIOS_PATH + "/" + portfolioResponse.data.id + "/pages"
        const pagePath = path + "/" + singlePage.id
        const sectionsPath = pagePath + "/sections";
        const sectionPath = sectionsPath + "/" + singleSection.id
        // await API.put(sectionPath, singleSection, getConfig())
        await API.patch(pagePath, pages[0], getConfig())
        // await API.put(sectionsPath, pages[0].sections, getConfig())
        // console.log(pages)
        // await API.put(path, pages, getConfig())
        // await Promise.all([
        //   savePages(portfolioResponse.data.id),
        //   savePortfolioLinks(portfolioResponse.data.id)
        // ]);
        await setSuccessMessage("Portfolio saved");
      } catch (e) {
        setErrorMessage(e.message);
        throw e;
      } finally {
        setSaving(false);
      }
    }
  }

  async function makePortfolioPublic(portfolio_id: number) {
    return await changePortfolioPrivacy(
      portfolio_id,
      false,
      getConfig(),
      updateState
    );
  }

  async function makePortfolioPrivate(portfolio_id: number) {
    return await changePortfolioPrivacy(
      portfolio_id,
      true,
      getConfig(),
      updateState
    );
  }

  function resetFullPortfolio() {
    resetState();
    resetPages();
    resetSections();
    resetPortfolioLinks();
  }

  return {
    portfolioData: state,
    fetchFullPortfolio,
    getFetchedPortfolio,
    getLightTheme,
    isPrivate,
    setPortfolioName,
    setPortfolioTheme,
    setPortfolio,
    saveFullPortfolio,
    makePortfolioPublic,
    makePortfolioPrivate,
    portfolioIsFetched,
    resetFullPortfolio,
  };
};
