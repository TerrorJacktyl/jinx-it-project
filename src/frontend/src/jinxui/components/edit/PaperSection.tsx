import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SaveSharpIcon from "@material-ui/icons/SaveSharp";
import {
  PaperSectionBase,
  PaperSectionDiv,
  useUser,
  useSection,
} from "jinxui";
import { TEditSection } from "jinxui/types";
import { InputAdornment } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import Tooltip from "@material-ui/core/Tooltip";

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
  justify-self: end;
  align-items: center;
`;

// Required for disabled buttons
const TooltipDiv = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 10px;
`;

type TPaperSection = {
  section: any;
  children: any;
  hideEditButtons?: boolean;
  handleTitleChange: any;
  handlePublish: any;
};

const PaperSection = (props: TPaperSection) => {
  const { savingState } = useUser();
  const {
    getSavedSections,
    handleSectionDelete,
    handleSectionMoveUp,
    handleSectionMoveDown,
  } = useSection();
  const [isSaving, setIsSaving] = useState(false);
  const index = getSavedSections().findIndex(
    (p: TEditSection) => p.uid === props.section.uid
  );

  let deleteDisabled = false;
  let upArrowDisabled = false;
  let downArrowDisabled = false;
  if (getSavedSections().length === 1) {
    deleteDisabled = true;
  }
  if (index === 0) {
    upArrowDisabled = true;
  }
  if (index === getSavedSections().length - 1) {
    downArrowDisabled = true;
  }

  useEffect(() => {
    setIsSaving(savingState);
  }, [savingState]);

  const handleDelete = () => {
    handleSectionDelete(index);
  };

  const handleMoveUp = () => {
    handleSectionMoveUp(index, props.section)
  };

  const handleMoveDown = () => {
    handleSectionMoveDown(index, props.section)
  }

  return (
    <PaperSectionDiv id={props.section.uid}>
      <StyledDivOuter>
        <StyledDivLeft>
          {/* Title */}

          <TextField
            name={props.section.uid}
            defaultValue={props.section.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              props.handleTitleChange(e, props.section.uid)
            }
            placeholder="Section Title"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CreateIcon />
                </InputAdornment>
              ),
            }}
          />
        </StyledDivLeft>
        <StyledDivCenter></StyledDivCenter>

        {/* Modify section list buttons */}

        <StyledDivRight>
          <Tooltip title="Save portfolio" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                onClick={props.handlePublish}
                disabled={isSaving}
              >
                <SaveSharpIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
          <Tooltip title="Move section up" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                disabled={upArrowDisabled}
                onClick={handleMoveUp}
              >
                <ArrowUpwardIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
          <Tooltip title="Move section down" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                disabled={downArrowDisabled}
                onClick={handleMoveDown}
              >
                <ArrowDownwardIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>

          <Tooltip title="Delete this section" arrow>
            <TooltipDiv>
              <StyledButton
                size="medium"
                style={{ minWidth: 40 }}
                onClick={handleDelete}
                disabled={deleteDisabled}
              >
                <DeleteOutlinedIcon />
              </StyledButton>
            </TooltipDiv>
          </Tooltip>
        </StyledDivRight>
      </StyledDivOuter>
      <PaperSectionBase elevation={3} variant="outlined" square>
        {props.children}
      </PaperSectionBase>
    </PaperSectionDiv>
  );
};

export default PaperSection;
