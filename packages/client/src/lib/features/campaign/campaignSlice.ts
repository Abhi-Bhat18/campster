'use client'
import { createSlice } from "@reduxjs/toolkit";
import { campaignAPIs } from "./campaignApis";

interface CampaignI {
  id: string;
  name: string;
  subject: string;
  mail_from: string;
  template_id: string;
  template_name: string;
  contact_list_id: string;
  contact_list_name: string;
  status: string;
  scheduled_at: Date;
  send_later: boolean;
  first_name: string;
  last_name: string;
  total_clicks: number;
  total_opens: number;
  total_delivered: number;
  total_bounces: number;
}

interface EmailI {
  emai: string;
}

interface InitialStateI {
  campaign: CampaignI | null;
  emails: EmailI[];
}

const initialState: InitialStateI = {
  campaign: null,
  emails: [],
};

const campaignSlice = createSlice({
  name: "campaign",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      campaignAPIs.endpoints.getACampaign.matchFulfilled,
      (state, action) => {
        state.campaign = action.payload;
      }
    );
    builder.addMatcher(
      campaignAPIs.endpoints.editACampaign.matchFulfilled,
      (state, action) => {
        state.campaign = action.payload;
      }
    );
  },
});

export default campaignSlice.reducer;
