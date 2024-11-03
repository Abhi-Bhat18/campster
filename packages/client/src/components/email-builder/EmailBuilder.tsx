import React from "react";
import TemplatePanel from "./App/TemplatePanel";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { DARK_THEME } from './theme2';

const EmailBuilder = () => {
  return (
    <>
      <ThemeProvider theme={DARK_THEME}>
        <CssBaseline/>
        <TemplatePanel />
      </ThemeProvider>
    </>
  );
};

export default EmailBuilder;
