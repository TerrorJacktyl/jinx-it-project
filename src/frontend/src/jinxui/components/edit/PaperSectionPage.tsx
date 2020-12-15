import React from "react";
import styled from "styled-components";
import {
  InputAdornment,
  TextField,
} from "@material-ui/core";
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

const PaperSectionPage = () => {
  const {
    getFetchedPortfolio,
    setPortfolioName,
  } = usePortfolio();
  return (
    <PaperSectionStatic title={""}>
      <OneColumnSectionDiv>
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
        <p></p>
        <LinksDiv>
          <DisplayLinks />
          <LinkDialog />
        </LinksDiv>
      </OneColumnSectionDiv>
    </PaperSectionStatic>
  );
};

export default PaperSectionPage