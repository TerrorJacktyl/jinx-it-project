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
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

import CreateIcon from "@material-ui/icons/Create";
import ListItemIcon from "@material-ui/core/ListItemIcon";


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
  // isEdit?: boolean;
  link?: TLinkData;
  setAnchoEl?: any
};
const LinkDialog = React.forwardRef((props: TLinkDialog, ref: any) => {
  const [open, setOpen] = useState(false);
  const [linkIcon, setLinkIcon] = useState(props.link?props.link.icon:"Web");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const ActivationButton = () => {
    if (props.link){
      return (
        <MenuItem onClick={()=>{
          handleClickOpen()
          if(props.setAnchoEl){
            props.setAnchoEl(null)
          }
        }
        }>
        <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
      );
    } else {
      return (
        <PrimaryButton onClick={handleClickOpen}>
          Add link
        </PrimaryButton>
      )  
    }
  }

  
  const newLink: TLinkData = {
    title: "",
    address: "",
    icon: linkIcon,
    id: uuidv4(),
  };
  
  const activeLink = props.link? props.link : newLink;
  const okayText = props.link? "OK" : "ADD";
  // if(props.link){
  //   setLinkIcon(props.link.icon);
  // }
  const handleAdd = () => {
    if (props.link) {
      // props.link.title="ASD"
      props.link.title = newLink.title
      // props.link.icon = activeLink.icon
      // props.link.title =activeLink.title
      // props.link.address = activeLink.address
      // const index = props.links.findIndex(
      //   (p: TLinkData) => p.id === props.link.id
      //   );
    } else {
      props.setLinks((links: any) => [...links, newLink]);
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
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
                  <LinkIconMenu 
                    linkIcon={linkIcon} 
                    setLinkIcon={setLinkIcon} />
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
