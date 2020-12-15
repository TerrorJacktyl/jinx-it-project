import { useContext } from "react";
import { LinkContext, useUser, usePortfolio } from "jinxui";
import API from "../../API";
import { v4 as uuidv4 } from "uuid";
import { TLinkData } from "../types/PortfolioTypes";

export const useLink = () => {
  const [state, updateState, setState] = useContext(LinkContext);
  const PORTFOLIOS_PATH = "api/portfolios";
  const { getConfig, getSavedPortfolioId } = useUser();

  async function getPageLinks(portfolio_id: number, page_id: number) {
    const path =
      PORTFOLIOS_PATH + "/" + portfolio_id + "/pages/" + page_id + "/links";
    const result = API.get(path, getConfig())
      .then((response: any) => {
        let links = [];
        try {
          for (var page_link of response.data) {
            links.push(page_link.link);
          }
        } catch (Error) {
          throw Error;
        }
        return links;
      })
      .catch((error: any) => {
        console.log(error);
        throw error;
      });
    return result;
  }

  async function fetchPageLinks(page_id: number) {
    try {
      const portfolio_id = getSavedPortfolioId();
      setState(await getPageLinks(portfolio_id, page_id));
    } catch (e) {
      throw e;
    }
  }

  async function setLinks(links: TLinkData[]) {
    try {
      await setState(links);
    } catch (e) {
      throw e;
    }
  }

  function addLink(link: TLinkData) {
    setState(...state, link);
  }

  function updateLink(link: TLinkData) {
    updateState(link.id, {
      title: link.title,
      address: link.address,
      icon: link.icon,
    });
  }

  function getSavedLinks() {
    return state;
  }

  return {
    fetchPageLinks,
    setLinks,
    getSavedLinks,
    addLink,
    updateLink,
  };
};
