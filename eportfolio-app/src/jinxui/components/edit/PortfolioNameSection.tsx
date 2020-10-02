import React from "react";
import styled from "styled-components";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik"
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import TextField from "@material-ui/core/TextField"
import { PaperSection } from "jinxui";

// This method for styling doesn't appear to be working
const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {},
    textFieldMain: {
      lineHeight: 4,
      letterSpacing: "0.03333em",
    },
  })
);

const OneColumnThinSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 10px;
`;

const SingleLineRequiredGrid = styled.div`
  display: grid;
  grid-template-rows: 50px;
  margin-bottom: -10px;
`;

const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string().max(50, "Too Long!").required("Required"),
});

const PortfolioNameSection = (props: any) => {
// function PortfolioNameSection(title: string, sectionName: string) {
  const classes = useStyles();
  // validationSchema={ProfileSchema}
  return (
      <PaperSection title={props.title}>
        <OneColumnThinSectionGrid>
          <SingleLineRequiredGrid>
            {props.children}
          </SingleLineRequiredGrid>
        </OneColumnThinSectionGrid>
      </PaperSection>
  );
}

export default PortfolioNameSection