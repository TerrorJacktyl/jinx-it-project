import React from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@material-ui/core";
import Skelaton from "@material-ui/lab/Skeleton";
import CreateIcon from "@material-ui/icons/Create";

import {
  useUser,
  usePortfolio,
  LinkDialog,
  PaperSectionStatic,
  OneColumnSectionDiv,
  DisplayLinks,
} from "jinxui";

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
`;

const LinksSkelatonDiv = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(10, auto);
  padding: 15px;
`;

const PaperSectionPage = () => {
  const {
    isLoading
  } = useUser();
  const {
    getFetchedPortfolio,
    setPortfolioName,
  } = usePortfolio();

  return (
    <>
      <PaperSectionStatic title={""}>
        <OneColumnSectionDiv>
          {isLoading() ? (
            <>
              <Skelaton variant="text" height={14} width={100} />
              <Skelaton variant="text" height={34} animation="wave" />
            </>
          ) : (
            <TextField
              name={"portfolioName"}
              label={"Portfolio Name"}
              defaultValue={getFetchedPortfolio().name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPortfolioName(e.target.value);
              }}
              id="standard-full-width"
              fullWidth
              color="secondary"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CreateIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <p></p>
          <LinksDiv>
            {isLoading() ? (
              <LinksSkelatonDiv>
                <Skelaton variant="circle" width={30} height={30} />
                <Skelaton variant="circle" width={30} height={30} />
                <Skelaton variant="circle" width={30} height={30} />
              </LinksSkelatonDiv>
            ) : (
              <>
                <DisplayLinks />
                <LinkDialog />
              </>
            )}
          </LinksDiv>
        </OneColumnSectionDiv>
      </PaperSectionStatic>
    </>
  );
};

export default PaperSectionPage;
