import { useContext } from "react";
import {
  LinkContext,
  useUser,
  PORTFOLIOS_PATH,
  listDelete,
  listMoveUp,
  listMoveDown,
} from "jinxui";
import API from "../../API";
import { TLink } from "jinxui/types";

async function putPortfolioLinks(
  portfolio_id: number,
  links: TLink[],
  config: any
) {
  const path =
    PORTFOLIOS_PATH +
    "/" +
    portfolio_id.toString() +
    "/links";
  try {
    const response = await API.put(path, links, config);
    return response;
  } catch (e) {
    throw e;
  }
}

export const useLink = () => {
  const [state, updateState, setState, resetState] = useContext(LinkContext);
  const PORTFOLIOS_PATH = "api/portfolios";
  const { getConfig } = useUser();

  function linkIndex(id: string, links?: TLink[]) {
    const thisLinks = links ? links : state;
    return thisLinks.findIndex((p: TLink) => p.id === id);
  }

  async function getPortfolioLinks(portfolio_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/links";
    const result = API.get(path, getConfig())
      .then((response: any) => {
        let links: TLink[] = [];
        try {
          for (var page_link of response.data) {
            links.push(page_link.link);
          }
        } catch (Error) {
          throw Error;
        }
        links.sort((a, b) => (a.number > b.number ? 1 : -1));
        return links;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  async function fetchPortfolioLinks(portfolio_id: number) {
    try {
      setState(await getPortfolioLinks(portfolio_id));
    } catch (e) {
      throw e;
    }
  }

  const getCleanedPortfolioLinks = (externalLinks?: TLink[]) => {
    var cleanLinks = externalLinks ? externalLinks : state;
    for (var i = 0; i < cleanLinks.length; i++) {
      cleanLinks[i].number = i;
    }
    return cleanLinks;
  };

  async function setPortfolioLink(links: TLink[]) {
    try {
      await setState(links);
    } catch (e) {
      throw e;
    }
  }

  function addPortfolioLink(link: TLink, links?: TLink[], setLinks?: any) {
    if (links) {
      setLinks(...links, link);
    } else {
      setState(...state, link);
    }
  }

  function updatePortfolioLink(link: TLink, externalUpdateLink?: any) {
    if (externalUpdateLink) {
      externalUpdateLink(link.id, {
        title: link.title,
        address: link.address,
        icon: link.icon,
      });
    } else {
      updateState(link.id, {
        title: link.title,
        address: link.address,
        icon: link.icon,
      });
    }
  }

  function getFetchedPortfolioLinks() {
    return state;
  }

  async function savePortfolioLinks(portfolio_id: number) {
    try {
      return await putPortfolioLinks(
        portfolio_id,
        getCleanedPortfolioLinks(),
        getConfig()
      );
    } catch (e) {
      throw e;
    }
  }

  function handlePortfolioLinkDelete(link: TLink) {
    const index = linkIndex(link.id);
    setState(listDelete(state, index));
  }

  function handlePortfolioLinkMoveUp(link: TLink) {
    const index = linkIndex(link.id);
    setState(listMoveUp(state, index));
  }

  function handlePortfolioLinkMoveDown(link: TLink) {
    const index = linkIndex(link.id);
    setState(listMoveDown(state, index))
  }

  function resetPortfolioLinks() {
    resetState();
  }

  return {
    linkIndex,
    fetchPortfolioLinks,
    setPortfolioLink,
    getFetchedPortfolioLinks,
    addPortfolioLink,
    updatePortfolioLink,
    savePortfolioLinks,
    handlePortfolioLinkDelete,
    handlePortfolioLinkMoveUp,
    handlePortfolioLinkMoveDown,
    resetPortfolioLinks,
  };
};
