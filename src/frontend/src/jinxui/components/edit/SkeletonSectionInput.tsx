import React from "react";
import styled from "styled-components";

import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";

import { PaperSectionBase, SkeletonLinks } from "jinxui";

const ButtonsSkeletonDiv = styled.div`
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
        <Skeleton variant="circle" width={48} height={48} />
      </Box>
      <Box
        display="flex"
        height={46}
        width="100%"
        justifyContent="space-between"
      >
        <Skeleton variant="text" width={210} />
        <ButtonsSkeletonDiv>
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton variant="circle" width={30} height={30} />
          <Skeleton variant="circle" width={30} height={30} />
        </ButtonsSkeletonDiv>
      </Box>
      <PaperSectionBase elevation={3} variant="outlined" square>
        <Box width="100%" height={485} padding="30px" display="flex" flexDirection="column">
          <SkeletonLinks />
          <Box height="15px" />
          <Skeleton
            variant="rect"
            width="100%"
            height="100%"
            animation="wave"
          />
        </Box>
      </PaperSectionBase>
      <Box height="30px" />
      <Box display="flex" justifyContent="center">
        <Skeleton variant="circle" width={48} height={48} />
      </Box>
    </>
  );
};

export default TextSectionInput;
