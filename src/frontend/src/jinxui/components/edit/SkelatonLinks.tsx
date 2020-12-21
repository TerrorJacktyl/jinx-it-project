import React from "react";
import styled from "styled-components";
import Skelaton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box"

const LinksSkelatonDiv = styled.div`
  display: grid;
  grid-gap: 42px;
  grid-template-columns: repeat(3, auto);
  padding-left: 22px;
  width: max-content;
`;

const SkelatonLinks = () => {
  return (
    <LinksSkelatonDiv>
      <Box padding="6px 8px">
        <Skelaton variant="circle" width={24} height={24} />
      </Box>
      <Box padding="6px 8px">
        <Skelaton variant="circle" width={24} height={24}/>
      </Box>
      <Box padding="6px 8px">
        <Skelaton variant="circle" width={24} height={24}/>
      </Box>
    </LinksSkelatonDiv>
  );
};

export default SkelatonLinks