import React from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@material-ui/core";
import Skelaton from "@material-ui/lab/Skeleton";
import CreateIcon from "@material-ui/icons/Create";

import {
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
    getFetchedPortfolio,
    setPortfolioName,
    portfolioIsFetched,
  } = usePortfolio();


  return (
    <>
    <PaperSectionStatic title={""}>
      <OneColumnSectionDiv>
        {portfolioIsFetched() ? (
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
        ) : (
          <>
            <Skelaton variant="text" height={14} width={100} />
            <Skelaton variant="text" height={34} animation="wave"/>
          </>
        )}
        <p></p>
        <LinksDiv>
          {portfolioIsFetched() ? (
            <>
              <DisplayLinks />
              <LinkDialog />
            </>
          ) : (
            <LinksSkelatonDiv>
              <Skelaton variant="circle" width={30} height={30} />
              <Skelaton variant="circle" width={30} height={30} />
              <Skelaton variant="circle" width={30} height={30} />
            </LinksSkelatonDiv>
          )}
        </LinksDiv>
      </OneColumnSectionDiv>
    </PaperSectionStatic>
    </>
  );
};

export default PaperSectionPage;
