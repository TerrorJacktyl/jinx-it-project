import React from "react"
import styled from "styled-components"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined"

const SectionDiv = styled.div`
  margin-top: 0px;
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 100px, 1fr;
`;

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

const StyledFieldTitle = styled.h3`
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-top: 0px;
  text-align: left;
  font-size: 20px;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;

const PaperSection = (props: any) => {
  return (
    <SectionDiv>
      <StyledDivOuter>
        <StyledDivLeft>
          <StyledFieldTitle>{props.title}</StyledFieldTitle>
        </StyledDivLeft>
        <StyledDivCenter></StyledDivCenter>
        <StyledDivRight>
          <IconButton size="small">
            <ArrowUpwardIcon />
          </IconButton>
          <IconButton size="small">
            <ArrowDownwardIcon />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlinedIcon />
          </IconButton>
        </StyledDivRight>
      </StyledDivOuter>
      <StyledPaper elevation={3} variant="outlined" square>
        {props.children}
      </StyledPaper>
    </SectionDiv>
  );
};

export default PaperSection