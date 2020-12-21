import React from "react";
import styled from "styled-components";
import { InputAdornment, TextField } from "@material-ui/core";
import Skelaton from "@material-ui/lab/Skeleton";
import CreateIcon from "@material-ui/icons/Create";

import {
  useUser,
  usePortfolio,
  LinkDialog,
  LinksDisplay,
  SkelatonLinks,
  PaperSectionStatic,
  OneColumnSectionDiv,
} from "jinxui";

const LinksDiv = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap;
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
              <Skelaton variant="text" height={40} animation="wave" />
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
                style: { fontSize: 18, fontWeight: 400 },
              }}
            />
          )}
          <p></p>
          <LinksDiv>
            {isLoading() ? (
              <SkelatonLinks />
            ) : (
              <>
                <LinksDisplay />
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
