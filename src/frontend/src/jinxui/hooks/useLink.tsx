import { useContext } from "react";
import { LinkContext, useUser, PORTFOLIOS_PATH } from "jinxui";
import API from "../../API";
import { TLink } from "jinxui/types";

async function putLinks(
  portfolio_id: number,
  page_id: number,
  links: TLink[],
  config: any,
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
  const { getConfig, getSavedPortfolioId } = useUser();

  function linkIndex(id: string) {
    return state.findIndex((p: TLink) => p.id === id);
  }

  async function getPageLinks(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/links";
    const result = API.get(path, getConfig())
      .then((response: any) => {
        let links:TLink[] = [];
        try {
          for (var page_link of response.data) {
            links.push(page_link.link);
          }
        } catch (Error) {
          throw Error;
        }
        links.sort((a, b) => (a.number > b.number) ? 1 : -1)
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

  const getCleanedLinks = () => {
    for (var i = 0; i < state.length; i++) {
      state[i].number = i;
    }
    return state;
  }

  async function setLinks(links: TLink[]) {
    try {
      await setState(links);
    } catch (e) {
      throw e;
    }
  }

  function addLink(link: TLink) {
    setState(...state, link);
  }

  function updateLink(link: TLink) {
    updateState(link.id, {
      title: link.title,
      address: link.address,
      icon: link.icon,
    });
  }

  function getFetchedLinks() {
    return state;
  }

  async function saveLinks(portfolio_id: number, page_id: number) {
    try {
      return await putLinks(portfolio_id, page_id, getCleanedLinks(), getConfig())
    } catch (e) {
      throw e;
    }
  }

  function handleLinkDelete(link: TLink) {
    const index = linkIndex(link.id);
    setState([...state.slice(0, index), ...state.slice(index + 1)]);
  }

  function handleLinkMoveUp(link: TLink) {
    const index = linkIndex(link.id);
    if (index === 0) {
      return;
    }
    const current_links = state;

    const top = current_links.slice(0, index - 1);
    const one_above = current_links.slice(index - 1, index);
    const rest = current_links.slice(index + 1);

    setState(top.concat(link, one_above, rest));
  }

  function handleLinkMoveDown(link: TLink) {
    const index = linkIndex(link.id);
    if (index === state.length - 1) {
      return;
    }
    const current_links = state;

    const top = current_links.slice(0, index);
    const one_below = current_links.slice(index + 1, index + 2);
    const rest = current_links.slice(index + 2);

    setState(top.concat(one_below, link, rest));
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
