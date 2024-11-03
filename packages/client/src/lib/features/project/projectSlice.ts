"use client";
import { createSlice } from "@reduxjs/toolkit";
import { projectAPIs } from "./projectApis";

interface ProjectI {
  id: string;
  name: string;
  description: string;
  default_mail_from: string;
  created_by: string;
  first_name: string;
  last_name: string;
  updated_at: Date;
  created_at: Date;
}

interface InitialStateI {
  project: ProjectI | null;
}

const initialState: InitialStateI = {
  project: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      projectAPIs.endpoints.getAProject.matchFulfilled,
      (state, action) => {
        state.project = action.payload;
      }
    );
    builder.addMatcher(
      projectAPIs.endpoints.updateProject.matchFulfilled,
      (state, action) => {
        console.log("payload", action.payload);
        state.project = { ...state.project, ...action.payload };
      }
    );
  },
});

export default projectSlice.reducer;
