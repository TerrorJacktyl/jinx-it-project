import styled from "styled-components"
import Paper from "@material-ui/core/Paper"
import { LightShadowColour } from "jinxui"

// Base styled paper for use on all sections\

const PaperSectionBase = styled(Paper)`
  padding: 10px;
  box-shadow: 0px 0px 0px 0px rgba(${() => LightShadowColour}, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 2px 2px 5px 0px rgba(${() => LightShadowColour}, 0.3);
  }
`;

export default PaperSectionBase