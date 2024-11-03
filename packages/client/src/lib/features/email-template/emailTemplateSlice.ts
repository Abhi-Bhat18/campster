"use client";
import { createSlice } from "@reduxjs/toolkit";
import { emailTemplateAPIs } from "./emailTemplateApis";
import { resetDocument } from "@/components/email-builder/documents/editor/EditorContext";

type SearchResult = {
  name: string;
  id: string;
};

interface IinitialState {
  name: string | null;
  description: string | null;
  template_id: string | null;
  searchResults: SearchResult[];
  templates: Template[];
}

const initialState: IinitialState = {
  name: null,
  description: null,
  template_id: null,
  searchResults: [],
  templates: [],
};

export type Template = {
  id: string;
  name: string;
  project_id: string;
  project_name: string;
  status: "ready" | "draft";
  created_at: Date;
  updated_at: Date;
  created_by: string;
  first_name: string;
  last_name: string;
};

const templateSlice = createSlice({
  name: "email-template",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      emailTemplateAPIs.endpoints.getAnEmailTemplate.matchFulfilled,
      (state, action) => {
        state.description = action.payload.description;
        state.name = action.payload.name;
        state.template_id = action.payload.id;
        resetDocument(action.payload.json);
      }
    );
    builder.addMatcher(
      emailTemplateAPIs.endpoints.searchForTemplate.matchFulfilled,
      (state, action) => {
        state.searchResults = action.payload;
      }
    );
    builder.addMatcher(
      emailTemplateAPIs.endpoints.getEmailTemplates.matchFulfilled,
      (state, action) => {
        state.templates = action.payload;
      }
    );

    builder.addMatcher(
      emailTemplateAPIs.endpoints.archiveTemplates.matchFulfilled,
      (state, action) => {
        const archivedTemplateId = action.payload.map(
          (template: { id: string }) => template.id
        );
        state.templates = state.templates.filter(
          (template) => !archivedTemplateId.includes(template.id)
        );
      }
    );
  },
});

export default templateSlice.reducer;
