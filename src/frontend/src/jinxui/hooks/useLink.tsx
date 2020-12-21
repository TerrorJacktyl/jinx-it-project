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

async function putLinks(
  portfolio_id: number,
  page_id: number,
  links: TLink[],
  config: any
) {
  const path =
    PORTFOLIOS_PATH +
    "/" +
    portfolio_id.toString() +
    "/pages/" +
    page_id.toString() +
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

  async function getPageLinks(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/links";
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

  async function fetchPageLinks(portfolio_id: number, page_id: number) {
    try {
      setState(await getPageLinks(portfolio_id, page_id));
    } catch (e) {
      throw e;
    }
  }

  const getCleanedLinks = (externalLinks?: TLink[]) => {
    var cleanLinks = externalLinks ? externalLinks : state;
    for (var i = 0; i < cleanLinks.length; i++) {
      cleanLinks[i].number = i;
    }
    return cleanLinks;
  };

  async function setLinks(links: TLink[]) {
    try {
      await setState(links);
    } catch (e) {
      throw e;
    }
  }

  function addLink(link: TLink, links?: TLink[], setLinks?: any) {
    if (links) {
      setLinks(...links, link);
    } else {
      setState(...state, link);
    }
  }

  function updateLink(link: TLink, externalUpdateLink?: any) {
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

  function getFetchedLinks() {
    return state;
  }

  async function saveLinks(portfolio_id: number, page_id: number) {
    try {
      return await putLinks(
        portfolio_id,
        page_id,
        getCleanedLinks(),
        getConfig()
      );
    } catch (e) {
      throw e;
    }
  }

  function handleLinkDelete(link: TLink) {
    const index = linkIndex(link.id);
    setState(listDelete(state, index));
  }

  function handleLinkMoveUp(link: TLink) {
    const index = linkIndex(link.id);
    setState(listMoveUp(state, index));
  }

  function handleLinkMoveDown(link: TLink) {
    const index = linkIndex(link.id);
    setState(listMoveDown(state, index))
  }

  function resetLinks() {
    resetState();
  }

  return {
    linkIndex,
    fetchPageLinks,
    setLinks,
    getFetchedLinks,
    addLink,
    updateLink,
    saveLinks,
    handleLinkDelete,
    handleLinkMoveUp,
    handleLinkMoveDown,
    resetLinks,
  };
};
