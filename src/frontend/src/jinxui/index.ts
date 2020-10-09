/* Form */
export { default as ErrorMessage } from "./components/form/ErrorMessage";
export { default as EntryTitle } from "./components/form/EntryTitle";
export { default as FormDiv } from "./components/form/FormDiv";
export { default as FormEntry } from "./components/form/FormEntry";
export { default as SubmitButton } from "./components/form/SubmitButton";
export { default as FormAlert } from "./components/form/FormAlert";
export { default as FormOuterDiv } from "./components/form/FormOuterDiv";
export { default as FormBottomButtonsDiv } from "./components/form/FormBottomButtonsDiv"

/* Site */
export { default as SiteLayout } from "./components/site/SiteLayout";

/* Button */
export { PrimaryButton } from "./components/button/Button";
export { SecondaryButton } from "./components/button/Button";

/* Header */
export { default as HeaderDiv } from "./components/header/HeaderDiv";
export { default as SiteHeader } from "./components/header/SiteHeader";
export { default as LogoLink } from "./components/header/LogoLink";
export { default as HeaderTitle } from "./components/header/HeaderTitle";
export { default as HeaderBar } from "./components/header/HeaderBar";
export { default as HeaderButton } from "./components/header/HeaderButton";

/* Account */
export { default as AccountPageDiv } from "./components/account/AccountPageDiv";
export { default as UserAvatarDropdown } from "./components/account/UserAvatarDropdown";

/* Display */
export { default as PageName } from "./components/display/PageName";
export { default as SectionName } from "./components/display/SectionName";
export { default as TextSectionDiv } from "./components/display/TextSectionDiv";
export { default as PageDiv } from "./components/display/PageDiv";
export { default as UserImage } from "./components/display/UserImage";
export { default as PrimaryMenu } from "./components/display/PrimaryMenu";
export { default as OneColumnSectionDiv } from "./components/display/OneColumnSectionDiv";
export { default as TwoColumnSectionDiv } from "./components/display/TwoColumnSectionDiv";
export { default as PrimaryColumnDiv } from "./components/display/PrimaryColumnDiv";

/* Edit */
export { default as PaperSection } from "./components/edit/PaperSection"
export { default as NewSectionMenu } from "./components/edit/NewSectionMenu"
export { default as UploadImageSubSection } from "./components/edit/UploadImageSubSection"
export { default as TextFieldSubSection } from "./components/edit/TextFieldSubSection"
export { default as PortfolioNameSectionInput } from "./components/edit/PortfolioNameSectionInput"
export { default as TextSectionInput } from "./components/edit/TextSectionInput"
export { default as ImageSectionInput } from "./components/edit/ImageSectionInput"
export { default as ImageTextSectionInput } from "./components/edit/ImageTextSectionInput"

/* Home */
export { default as HomeTemplates } from "./components/home/HomeTemplates";

/* Routes */
export { LoggedInRoute, LoggedOutRoute } from "./routes/ProtectedRoutes.js";
export { Routes } from "./routes/Routes";
/* Context */
export {
  UserContextProvider,
  UserContext,
  defaultUserContext,
  storeUserData,
  retrieveUserData,
} from "./contexts/index";

export type { IUserContext } from "./contexts/index";
export type { IThemeContext } from "./contexts/index"

/* Hook */
export { useUser } from "./hooks/useUser";

/* Theme */
export {
  LightTheme,
  DarkTheme,
  LightShadowColour,
  DarkShadowColour,
  LightHeaderGrad,
  DarkHeaderGrad,
  LightTitleBGGrad,
  DarkTitleBGGrad,
  LightPrimaryButtonGrad,
  LightPrimaryButtonGradHover,
  DarkPrimaryButtonGrad,
} from "./theme/GlobalTheme";
