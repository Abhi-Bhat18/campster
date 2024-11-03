"use client";
import React from "react";

import { MonitorOutlined, PhoneIphoneOutlined } from "@mui/icons-material";
import {
  Box,
  Stack,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material";

import {
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
  setSidebarTab,
  useSelectedSidebarTab,
} from "../../documents/editor/EditorContext";

import DownloadJson from "./DownloadJson";

import ImportJson from "./ImportJson";

import MainTabsGroup from "./MainTabsGroup";

import ConfigurationPanel from "../InspectorDrawer/ConfigurationPanel";
import StylesPanel from "../InspectorDrawer/StylesPanel";
import StylesNConfiguratoinTabs from "./StylesNConfiguratoinTabs";

export default function TemplatePanel() {
  const selectedScreenSize = useSelectedScreenSize();

  const selectedSidebarTab = useSelectedSidebarTab();

  const renderCurrentSidebarPanel = () => {
    switch (selectedSidebarTab) {
      case "block-configuration":
        return <ConfigurationPanel />;
      case "styles":
        return <StylesPanel />;
    }
  };

  let mainBoxSx: SxProps = {
    height: "100%",
  };

  if (selectedScreenSize === "mobile") {
    mainBoxSx = {
      ...mainBoxSx,
      margin: "32px auto",
      width: 370,
      height: 800,
      boxShadow:
        "rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px",
    };
  }

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case "mobile":
      case "desktop":
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize("desktop");
    }
  };

  return (
    <>
      {/* <div className="h-[50px] sticky top-0 z-10 px-1 flex justify-between items-center bg-secondary">
        <Stack direction="row" spacing={2}>
          <DownloadJson />
          <ImportJson />
          <ToggleButtonGroup
            value={selectedScreenSize}
            exclusive
            size="small"
            onChange={handleScreenSizeChange}
          >
            <ToggleButton value="desktop">
              <Tooltip title="Desktop view">
                <MonitorOutlined fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="mobile">
              <Tooltip title="Mobile view">
                <PhoneIphoneOutlined fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </div> */}

      <div className="w-full min-w-[370px] flex space-x-5">
        <div className="basis-3/4 max-w-[70%] overflow-x-hidden">
          <MainTabsGroup />
        </div>
        <div className="basis-1/4">
          <StylesNConfiguratoinTabs />
        </div>
      </div>
    </>
  );
}
