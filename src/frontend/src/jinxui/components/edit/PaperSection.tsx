import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { PaperSectionBase, PaperSectionDiv, PaperSectionTitle } from "jinxui";
import { TEditSection } from "jinxui/types";
import { LensOutlined } from "@material-ui/icons";

const StyledDivOuter = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 46px;
`;

const StyledDivLeft = styled.div`
  padding-left: 0px;
  display: flex;
  align-items: center;
`;

const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
`;

const StyledDivRight = styled.div`
  padding-right: 0px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 10px;
`;

type TPaperSection = {
  section: any;
  sections: any;
  setSections: any;
  children: any;
  hideEditButtons?: boolean;
};

const PaperSection = (props: TPaperSection) => {
  const index = props.sections.findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );
  const handleDelete = () => {
    props.setSections([
      ...props.sections.slice(0, index),
      ...props.sections.slice(index + 1),
    ]);
  };
  let deleteDisabled = false
  let upArrowDisabled = false
  let downArrowDisabled = false
  if(props.sections.length === 1) {
    deleteDisabled=true
  }
  if(index === 0) {
    upArrowDisabled = true
  }
  if(index === props.sections.length - 1) {
    downArrowDisabled = true
  }



  return (
    <PaperSectionDiv>
      <StyledDivOuter>
        <StyledDivLeft>
          <PaperSectionTitle>{props.section.name}</PaperSectionTitle>
        </StyledDivLeft>
        <StyledDivCenter></StyledDivCenter>
        <StyledDivRight>
          <StyledButton 
            size="medium" 
            style={{ minWidth: 40 }}
            disabled={upArrowDisabled}
          >
            <ArrowUpwardIcon />
          </StyledButton>
          <StyledButton 
            size="medium" 
            style={{ minWidth: 40 }}
            disabled={downArrowDisabled}
          >
            <ArrowDownwardIcon />
          </StyledButton>
          <StyledButton
            size="medium"
            style={{ minWidth: 40 }}
            onClick={handleDelete}
            disabled={deleteDisabled}
          >
            <DeleteOutlinedIcon />
          </StyledButton>
        </StyledDivRight>
      </StyledDivOuter>
      <PaperSectionBase elevation={3} variant="outlined" square>
        {props.children}
      </PaperSectionBase>
    </PaperSectionDiv>
  );
};

export default PaperSection;
