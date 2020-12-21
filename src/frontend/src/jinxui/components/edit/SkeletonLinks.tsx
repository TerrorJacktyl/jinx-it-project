import React from "react";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box"

const LinksSkeletonDiv = styled.div`
  display: grid;
  grid-gap: 42px;
  grid-template-columns: repeat(3, auto);
  padding-left: 22px;
  width: max-content;
`;

const SkeletonLinks = () => {
  return (
    <LinksSkeletonDiv>
      <Box padding="6px 8px">
        <Skeleton variant="circle" width={24} height={24} />
      </Box>
      <Box padding="6px 8px">
        <Skeleton variant="circle" width={24} height={24}/>
      </Box>
      <Box padding="6px 8px">
        <Skeleton variant="circle" width={24} height={24}/>
      </Box>
    </LinksSkeletonDiv>
  );
};

export default SkeletonLinks