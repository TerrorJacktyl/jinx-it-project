import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

// import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import CreateIcon from "@material-ui/icons/Create";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import {
  LinkIconMenu,
  PrimaryButton,
  SecondaryButton,
  useLink,
  useSection,
  LinkIconEnum,
} from "jinxui";
import { TLink } from "jinxui/types";

const LinkInputDiv = styled.div`
  display: grid;
  row-gap: 30px;
`;

const LinkInputInnerDiv = styled.div`
  display: flex;
  align-items: baseline;
`;

const PublishCancelDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row-reverse;
  align-items: flex-end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
  width: 100%;
`;

/**
 *  Dialog for choosing or modifying a link / icon combination
 */
type TLinkDialog = {
  link?: TLink;
  sectionUid?: string;
  setAnchoEl?: any;
};
const LinkDialog = React.forwardRef((props: TLinkDialog, ref: any) => {
  const [open, setOpen] = useState(false);
  const [linkIcon, setLinkIcon] = useState(
    props.link ? props.link.icon : LinkIconEnum.Disabled
  );
  const { updateLink, } = useLink();
  const { sectionLinkAdd, getFetchedSections, } = useSection();

  const handleClickOpen = () => {
    setOpen(true);
  };

  // The link to use if not editing an existing one
  const newLink: TLink = {
    title: "",
    address: "",
    icon: LinkIconEnum.Disabled,
    id: "",
    number: 0,
  };

  useEffect(() => {
    console.log("USE EFFECTED")
  }, [getFetchedSections()])

  // Set up the link to be worked on
  const activeLink = props.link ? props.link : newLink;

  // Set up the button text
  const okayText = props.link ? "OK" : "ADD";

  // Add new link to list / update existing
  const handleUpdate = () => {    
    if (props.sectionUid) {
      sectionLinkAdd(props.sectionUid, activeLink)
    } else {
      updateLink(activeLink);
    }
    setLinkIcon(0);
    setOpen(false);
  };

  const handleClose = () => {

    setOpen(false);
  };

  // The 'OK' button
  const ActivationButton = () => {
    if (props.link) {
      return (
        <MenuItem
          onClick={() => {
            handleClickOpen();
            if (props.setAnchoEl) {
              props.setAnchoEl(null);
            }
          }}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      );
    } else {
      return (
        <Tooltip title="Add new external link" arrow>
          <Button
            onClick={handleClickOpen}
            color="primary"
            variant="text"
            disableElevation
          >
            <AddCircleIcon />
          </Button>
        </Tooltip>
      );
    }
  };

  return (
    <>
      <ActivationButton />
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <Formik
          initialValues={{
            linkTitle: activeLink.title,
            linkAddress: activeLink.address,
          }}
          onSubmit={(values) => {
            activeLink.title = values.linkTitle;
            activeLink.address = values.linkAddress;
            activeLink.icon = linkIcon;
            handleUpdate();
          }}
        >
          <Form>
            <DialogTitle id="link-dialog-title">Link</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Note: Leave title blank to display just the icon.
              </DialogContentText>
              <LinkInputDiv>
                <LinkInputInnerDiv>
                  <LinkIconMenu linkIcon={linkIcon} setLinkIcon={setLinkIcon} />
                  <Field
                    component={TextField}
                    id="linkTitle"
                    name="linkTitle"
                    label="Link Title"
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
                </LinkInputInnerDiv>
                <Field
                  component={TextField}
                  id="linkAddress"
                  name="linkAddress"
                  label="Link Address"
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
              </LinkInputDiv>
            </DialogContent>
            <DialogActions>
              <PublishCancelDiv>
                <div>
                  <PrimaryButton type="submit">{okayText}</PrimaryButton>
                </div>
                <div>
                  <SecondaryButton type="button" onClick={handleClose}>
                    Cancel
                  </SecondaryButton>
                </div>
              </PublishCancelDiv>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
});

export default LinkDialog;
