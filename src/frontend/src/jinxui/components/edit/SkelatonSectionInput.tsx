import React from "react";
import styled from "styled-components";

import Skelaton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

import { PaperSectionBase } from "jinxui";

const ButtonsSkelatonDiv = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(4, auto);
  padding: 15px;
  align-content: center;
  padding-right: 10px;
`;

const TextSectionInput = () => {
  return (
    <>
      <Box display="flex" justifyContent="center">
        <Skelaton variant="circle" width={48} height={48} />
      </Box>
      <Box
        display="flex"
        height={46}
        width="100%"
        justifyContent="space-between"
      >
        <Skelaton variant="text" width={210} />
        <ButtonsSkelatonDiv>
          <Skelaton variant="circle" width={30} height={30} />
          <Skelaton variant="circle" width={30} height={30} />
          <Skelaton variant="circle" width={30} height={30} />
          <Skelaton variant="circle" width={30} height={30} />
        </ButtonsSkelatonDiv>
      </Box>
      <PaperSectionBase elevation={3} variant="outlined" square>
        <Box width="100%" height={427} padding="30px">
          <Skelaton
            variant="rect"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Box>
      </PaperSectionBase>
      <Box height="30px" />
      <Box display="flex" justifyContent="center">
        <Skelaton variant="circle" width={48} height={48} />
      </Box>
    </>
  );
};

export default TextSectionInput;
