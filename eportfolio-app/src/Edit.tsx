import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import {
  Paper,
  Button,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuProps,
  MenuItem,
  Slide,
  useScrollTrigger,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {
  AddPhotoAlternateOutlined,
  SettingsBrightness,
  Person,
  DeleteOutlined,
  ArrowUpward,
  ArrowDownward,
  Add,
  InsertPhotoSharp,
  SubjectSharp,
  VerticalSplitSharp,
} from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";

import { TextField } from "formik-material-ui";

import Image from "../images/Logo_Background.svg";

import {
  ErrorMessage,
  FormDiv,
  SiteHeader,
  HeaderTitle,
  LightTheme,
  DarkTheme,
  useUser,
  AccountPageDiv,
  HeaderDiv,
  LogoLink,
  PageDiv,
  PageName,
  SectionName,
  TextSectionDiv,
} from "jinxui";

import { TPortfolio, TPage, TSection } from "./Types";

const FRONT_END_URL = "http://localhost:3000/";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {},
    transparentHoverFocus: {
      "&:hover, &.Mui-focusVisible": {
        backgroundColor: "transparent",
      },
    },
    publishButton: {
      width: "100%",
      height: "100%",
      fontSize: 16,
      fontWeight: 400,
      border: "1px solid",
      "&:hover": {
        border: "1px solid",
      },
    },
    cancelButton: {
      width: "100%",
      height: "100%",
      fontWeight: 300,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
    title: {
      flexGrow: 1,
      textAlign: "left",
      margin: 10,
      fontWeight: 400,
    },
    toolbar: {
      height: 50,
      margin: 0,
    },
    textFieldMain: {
      lineHeight: 4,
      letterSpacing: "0.03333em",
    },
  })
);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const StyledPaper = styled(Paper)`
  padding: 10px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }
`;

const StyledImageUploadOverlay = styled(Paper)`
  grid-column: 1/4;
  grid-row: 1/4;
  display: grid;
  width: 100%;
  height: 100%;
  align-content: center;
  text-align: center;
  font-size: 20px;
  opacity: 0%;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  :hover {
    opacity: 65%;
  }
  cursor: pointer;
`;

const StyledImageUploadButton = styled(AddPhotoAlternateOutlined)`
  z-index: 2;
`;

const SectionDiv = styled.div`
  margin-top: 0px;
  margin-bottom: 30px;
  display: grid;
  grid-template-rows: 100px, 1fr;
`;

const WideFormDiv = styled(FormDiv)`
  width: 920px;
`;

const UserImage = styled.img`
  margin-right: 0px;
  margin-left: 0px;
  height: auto;
  margin-top: 0px;
  border: 1px solid gray;
  width: 100%;
`;

const FormTitle = styled.h2`
  font-weight: 300;
`;

const FieldTitle = styled.h3`
  font-weight: 300;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-top: 0px;
  text-align: left;
  font-size: 20px;
`;

const StyledFormDiv = styled(WideFormDiv)`
  margin-top: 70px;
  height: auto;
  margin-bottom: 100px;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr minMax(200px, 900px) 1fr;
`;

const StyledInput = styled.input`
  display: none;
`;

const BottomButtonsDiv = styled.div`
  display: grid;
  grid-template-columns:
    5% minMax(40px, 200px) minMax(10%, auto)
    minMax(40px, 200px) 5%;
  grid-template-rows: 40px;
  margin-top: 30px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: 20px 30px 1fr;
  grid-template-rows: 1fr 30px 20px;
`;

const ImageGridMain = styled.div`
  grid-column: 1/4;
  grid-row: 1/4;
  object-fit: cover;
`;

const ImageGridIcon = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  object-fit: cover;
`;

const OneColumnSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 15px;
  direction: column;
`;

const OneColumnThinSectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px;
  margin-bottom: 10px;
`;

const TwoColumnSectionGrid = styled(OneColumnSectionGrid)`
  grid-template-columns: 1fr 1fr;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 60px;
`;

const SingleLineRequiredGrid = styled.div`
  display: grid;
  grid-template-rows: 50px;
  margin-bottom: -10px;
`;

const HeaderFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const HeaderFlexItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileSchema = Yup.object().shape({
  websiteName: Yup.string().max(50, "Too Long!").required("Required"),
});

const NewSectionMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Add />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SubjectSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Text" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InsertPhotoSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <VerticalSplitSharp fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Image and text" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

function sectionDataIsEmpty(data: any)
{
  return (
    (data.type == "text" && data.content == "") ||
    (data.type == "image" && data.image == 0) ||
    (data.type == "image_text" && data.image == 0 && data.content == "")
  )
}

function PostSection(
  postSection: any,
  portfolio_id: string,
  page_id: string,
  data: any
) {
  if (!sectionDataIsEmpty(data))
  {
    postSection(portfolio_id, page_id, data)
      .then(function (response: any) {
        console.log(response);
      })
      .catch(function (error: any) {
        console.log(error);
      });
    }
}

function UploadImageBit(
  uploadButtonLabel: string,
  imageResponse: any,
  setImageResponse: any
) {
  const classes = useStyles();
  const { uploadImage } = useUser();
  // const classes = useStyles();
  return (
    <>
      <label htmlFor={uploadButtonLabel}>
        <StyledInput
          accept="image/*"
          id={uploadButtonLabel}
          multiple
          type="file"
          onChange={(event) => {
            if (event.currentTarget.files) {
              uploadImage(
                event.currentTarget.files[0],
                event.currentTarget.files[0].name
              )
                .then((response) => {
                  console.log(response);
                  setImageResponse(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              console.log("Image failure");
            }
          }}
        />
        <ImageGrid>
          <ImageGridMain>
            <UserImage src={imageResponse.image} />{" "}
          </ImageGridMain>
          <StyledImageUploadOverlay elevation={0} square>
            Upload Image
          </StyledImageUploadOverlay>
          <ImageGridIcon>
            <StyledImageUploadButton />
          </ImageGridIcon>
        </ImageGrid>
      </label>
    </>
  );
}

const PaperSection = (props: any) => {
  // const classes = useStyles();
  return (
    <SectionDiv>
      <HeaderFlexContainer>
        <HeaderFlexItem>
          <FieldTitle>{props.title}</FieldTitle>
        </HeaderFlexItem>
        <HeaderFlexItem></HeaderFlexItem>
        <HeaderFlexItem>
          <IconButton size="small">
            <ArrowUpward />
          </IconButton>
          <IconButton size="small">
            <ArrowDownward />
          </IconButton>
          <IconButton size="small">
            <DeleteOutlined />
          </IconButton>
        </HeaderFlexItem>
      </HeaderFlexContainer>
      <StyledPaper elevation={3} variant="outlined" square>
        {props.children}
      </StyledPaper>
    </SectionDiv>
  );
};

const BetweenSections = () => {
  return (
    <NewSectionMenu />
    // <HeaderFlexContainer>
    //   <HeaderFlexItem></HeaderFlexItem>
    //   <HeaderFlexItem>
    //     <IconButton>
    //       <Add />
    //     </IconButton>
    //   </HeaderFlexItem>
    //   <HeaderFlexItem></HeaderFlexItem>
    // </HeaderFlexContainer>
  );
};

function PortfolioTitleSection(
  title: string,
  sectionName: string
) {
  const classes = useStyles();
  // console.log("THE NAME IS " + defaultText);
  return (
    <>
      <PaperSection title={title}>
        <OneColumnThinSectionGrid>
          <SingleLineRequiredGrid>
            <Field
              component={TextField}
              className={classes.textFieldMain}
              name={sectionName}
              id="standard-full-width"
              style={{ margin: 0 }}
              fullWidth
              color="secondary"
              // value={defaultText}
              errorstyle={{
                float: "right",
                margin: "30px",
                color: "white",
              }}
            />
          </SingleLineRequiredGrid>
        </OneColumnThinSectionGrid>
      </PaperSection>
    </>
  );
}

function ImageTextSectionBit(
  title: string,
  sectionName: string,
  touched: any,
  errors: any,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <TwoColumnSectionGrid>
          <div>
            {TextSectionField(sectionName, 18)}
            {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
          </div>
          <div>
            {UploadImageBit(sectionName, imageResponse, setImageResponse)}
          </div>
        </TwoColumnSectionGrid>
      </PaperSection>
    </>
  );
}

function ImageSectionBit(
  title: string,
  sectionName: string,
  imageResponse: any,
  setImageResponse: any
) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionGrid>
          {UploadImageBit(sectionName, imageResponse, setImageResponse)}
        </OneColumnSectionGrid>
      </PaperSection>
    </>
  );
}

function TextSectionBit(
  title: string,
  sectionName: string,
  touched: any,
  errors: any
) {
  return (
    <>
      <PaperSection title={title}>
        <OneColumnSectionGrid>
          {TextSectionField(sectionName, 15)}
          {errors && touched ? <ErrorMessage>{errors}</ErrorMessage> : null}
        </OneColumnSectionGrid>
      </PaperSection>
    </>
  );
}

const TextSectionField = (sectionName: string, rows: number) => {
  return (
    <Field
      component={TextField}
      name={sectionName}
      id="standard-full-width"
      style={{ margin: 0, marginBottom: 15 }}
      fullWidth
      multiline
      rows={rows}
      rowsMax={30}
      // variant="filled"
      color="secondary"
    />
  );
};
const Edit = () => {
  // Define redirect
  const [redirect, setRedirect] = useState(false);

  // Get Portfolio Bit
  // const tempPortfolioId = 24;
  // const [portfolio, setPortfolio] = useState<TPortfolio>(null);


  // End Get Portfolio Bit
  
  const [submittionError, setSubmittionError] = useState(false);
  const [bioImageResponse, setBioImageResponse] = useState({
    image: FRONT_END_URL + "blank_user.png",
    id: null,
  });
  const [awesomeImageResponse, setAwesomeImageResponse] = useState({
    image: FRONT_END_URL + "blank_user.png",
    id: null,
  });
  const { postPortfolio, postPage, postSection, savePortfolioId } = useUser();
  const [theme, setTheme] = useState(true);
  const appliedTheme = createMuiTheme(theme ? LightTheme : DarkTheme);
  const classes = useStyles();
  const trigger = useScrollTrigger();
  const onLogin = () => {
    return <Redirect to="/portfolio"/>
  }

  if (redirect) {
    return onLogin();
  } else {
    return (
      <>
        <ThemeProvider theme={appliedTheme}>
          {/* I can't figure out how to put this into a separate function  */}
          <ThemeProvider theme={DarkTheme}>
            <Slide appear={false} direction="down" in={!trigger}>
              <AppBar className={classes.toolbar}>
                <Toolbar className={classes.toolbar} variant="dense">
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    size="small"
                    aria-label="menu"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Awesome Portfolio
                  </Typography>
                  <IconButton size="small" onClick={() => setTheme(!theme)}>
                    <SettingsBrightness />
                  </IconButton>
                  <IconButton size="small">
                    <Person />
                  </IconButton>
                </Toolbar>
              </AppBar>
            </Slide>
          </ThemeProvider>
          <CssBaseline />
          <StyledFormDiv>
            <div></div>
            <div>
              <FormTitle>Enter your information</FormTitle>
              <Formik
                initialValues={{
                  websiteName: "",
                  biography: "",
                  academicHistory: "",
                  professionalHistory: "",
                }}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting }) => {
                  const portfolio_data = {
                    name: values.websiteName,
                  };
                  const page_data = {
                    name: "home",
                    number: "0",
                  };
                  const bio_data = {
                    name: "biography",
                    number: "0",
                    image: bioImageResponse.id,
                    content: values.biography,
                    type: "image_text",
                  };
                  const academic_data = {
                    name: "academic_history",
                    number: "0",
                    content: values.academicHistory,
                    type: "text",
                  };
                  const awesome_data = {
                    name: "awesome_image",
                    number: "0",
                    image: awesomeImageResponse.id,
                    type: "image",
                  };
                  const professional_data = {
                    name: "professional_history",
                    number: "0",
                    content: values.professionalHistory,
                    type: "text",
                  };
                  setSubmitting(true);
                  postPortfolio(portfolio_data)
                    .then(function (portfolio_response: any) {
                      const portfolio_id = portfolio_response.data.id;
                      
                      postPage(portfolio_id, page_data)
                        .then(function (page_response: any) {
                          console.log(page_response);
                          const page_id = page_response.data.id;
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            bio_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            academic_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            awesome_data
                          );
                          PostSection(
                            postSection,
                            portfolio_id,
                            page_id,
                            professional_data
                          );
                          
                        })
                        .catch(function (error: any) {
                          console.log(error);
                          setSubmitting(false);
                        });
                      savePortfolioId(parseInt(portfolio_id))
                      setSubmitting(false);
                      setRedirect(true);
                    })
                    .catch(function (error: any) {
                      setSubmittionError(true);
                      setSubmitting(false);
                      console.log(error);
                      console.log(submittionError);
                    });
                }}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    {PortfolioTitleSection(
                      "Website Name*",
                      "websiteName",
                    )}
                    <BetweenSections />
                    {ImageTextSectionBit(
                      "Biography",
                      "biography",
                      touched.biography,
                      errors.biography,
                      bioImageResponse,
                      setBioImageResponse
                    )}
                    <BetweenSections />
                    {errors.academicHistory && touched.academicHistory ? (
                      <ErrorMessage>{errors.academicHistory}</ErrorMessage>
                    ) : null}
                    {TextSectionBit(
                      "Academic History",
                      "academicHistory",
                      touched.academicHistory,
                      errors.academicHistory
                    )}
                    <BetweenSections />
                    {ImageSectionBit(
                      "Awesome Image",
                      "awesomeImage",
                      awesomeImageResponse,
                      setAwesomeImageResponse
                    )}
                    <BetweenSections />
                    {TextSectionBit(
                      "Professional History",
                      "professionalHistory",
                      touched.professionalHistory,
                      errors.academicHistory
                    )}
                    <BetweenSections />
                    <BottomButtonsDiv>
                      <div></div>
                      <div>
                        <Button
                          variant="outlined"
                          className={classes.cancelButton}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div></div>
                      <div>
                        <Button
                          type="submit"
                          variant="contained"
                          color="secondary"
                          className={classes.publishButton}
                          style={{ borderRadius: 5 }}
                        >
                          Publish
                        </Button>
                      </div>
                      <div></div>
                    </BottomButtonsDiv>
                    {submittionError ? (
                      <ErrorMessage>
                        Error signing up. Please try again later.
                      </ErrorMessage>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
            <div></div>
          </StyledFormDiv>
        </ThemeProvider>
      </>
    );
  }
};
export default Edit;

