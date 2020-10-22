import React from "react";
import { Redirect } from "react-router-dom";
import { Routes, useUser } from "jinxui";

export const PortfolioDisplay = () => {
  const { userData } = useUser();
  return <Redirect to={Routes.PORTFOLIO_DISPLAY_BASE + "/" + userData.username} />;
}