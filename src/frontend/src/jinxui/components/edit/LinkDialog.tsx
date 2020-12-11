import React, { useState } from "react";
import styled from "styled-components";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

import { v4 as uuidv4 } from "uuid";

import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import CreateIcon from "@material-ui/icons/Create";

import { LinkIconMenu, PrimaryButton, SecondaryButton } from "jinxui";
import { TLinkData } from "jinxui/types";

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
  align-items: end;
  justify-content: space-around;
  margin: 5px;
  padding: 5px;
  width: 100%;
`;

type TLinkDialog = {
  links: TLinkData[];
  setLinks: any;
};
const LinkDialog = (props: TLinkDialog) => {
  const [open, setOpen] = useState(false);
  const [linkIcon, setLinkIcon] = useState("Web");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const newLink: TLinkData = {
    title: "",
    address: "",
    icon: linkIcon,
    id: uuidv4(),
  };

  const handleAdd = () => {
    console.log(newLink);
    props.setLinks((links: any) => [...links, newLink]);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PrimaryButton onClick={handleClickOpen}>Add link</PrimaryButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title">
        <Formik
          initialValues={{ linkTitle: "", linkAddress: "" }}
          onSubmit={(values) => {
            newLink.title = values.linkTitle;
            newLink.address = values.linkAddress;
            handleAdd();
          }}
        >
          <Form>
            <DialogTitle id="link-dialog-title">Link</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Note: Leave Link Title blank to display just the icon.
              </DialogContentText>
              <LinkInputDiv>
                <LinkInputInnerDiv>
                  <LinkIconMenu linkIcon={linkIcon} setLinkIcon={setLinkIcon} />
                  <Field
                    component={TextField}
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
                  name={"linkAddress"}
                  label={"Link Address"}
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
                  <PrimaryButton type="submit">ADD</PrimaryButton>
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
};

export default LinkDialog;
