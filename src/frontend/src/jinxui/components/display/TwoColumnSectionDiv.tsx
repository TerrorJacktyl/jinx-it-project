import styled from "styled-components"
import { OneColumnSectionDiv } from "jinxui"

const TwoColumnSectionDiv = styled(OneColumnSectionDiv)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
  }
  grid-gap: 60px;

`;

export default TwoColumnSectionDiv