import React from "react";
import { Button } from "@material-ui/core";
import { SettingsBrightness } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

import { useUser, HeaderBar } from "jinxui";

const EditHeader = () => {
  const {
    switchLightThemeMode,
    getSavedLightThemeMode,
  } = useUser();

  return (
    <>
      <HeaderBar
        title="Edit"
        darkTheme={!getSavedLightThemeMode()}
        isUserEdit={true}
      >
        <Tooltip
          title={
            getSavedLightThemeMode()
              ? "Switch this page to dark theme"
              : "Switch this page to light theme"
          }
          arrow
        >
          <Button
            style={{ height: "100%", borderRadius: 0 }}
            onClick={() => {
              switchLightThemeMode().then(() => {});
            }}
            color="inherit"
          >
            <SettingsBrightness />
          </Button>
        </Tooltip>
      </HeaderBar>
    </>
  );
};

export default EditHeader;
