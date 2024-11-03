"use client";
import { createSlice } from "@reduxjs/toolkit";
import { contactListAPIs } from "./contactListApis";

interface ContactList {
  name: string;
  description: string;
  email_type: string;
  email_opt_in: string;
  template_id: string;
  first_name: string;
  last_name: string;
  updated_at: Date;
  created_at: string;
}

type ContactType = {
  contact_id: string;
  contact_list_id: string;
  first_name: string;
  last_name?: string;
  email: string;
  opt_in: string;
  unsubscribed: string;
  is_valid_email: boolean;
};

export type Lists = {
  id: string;
  name: string;
  email_type: "private" | "public";
  email_opt_in: "single" | "double";
  total_contacts: number;
  created_by: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: Date;
};

interface ContactListSlice {
  contactLists: Lists[];
  contactList: ContactList | null;
  contacts: ContactType[];
}

const initialState: ContactListSlice = {
  contactLists: [],
  contactList: null,
  contacts: [],
};

const contactListSlice = createSlice({
  name: "contact-list",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      contactListAPIs.endpoints.getAllContactLists.matchFulfilled,
      (state, action) => {
        state.contactLists = action.payload;
      }
    ),
      builder.addMatcher(
        contactListAPIs.endpoints.getAContactLists.matchFulfilled,
        (state, action) => {
          state.contactList = action.payload;
        }
      ),
      builder.addMatcher(
        contactListAPIs.endpoints.updateContactList.matchFulfilled,
        (state, action) => {
          state.contactList = action.payload;
        }
      );
    builder.addMatcher(
      contactListAPIs.endpoints.getContacts.matchFulfilled,
      (state, action) => {
        state.contacts = action.payload;
      }
    );
    builder.addMatcher(
      contactListAPIs.endpoints.addNewContact.matchFulfilled,
      (state, action) => {
        state.contacts = [action.payload, ...state.contacts];
      }
    );
    builder.addMatcher(
      contactListAPIs.endpoints.createNewList.matchFulfilled,
      (state, action) => {
        state.contactLists = [
          {
            first_name: "",
            last_name: "",
            created_at: action.payload.created_at,
            created_by: action.payload.created_by,
            email_opt_in: "single",
            email_type: action.payload.opt_in,
            id: action.payload.id,
            name: action.payload.name,
            status: action.payload.status,
            total_contacts: action.payload.total_counts,
          },
          ...state.contactLists,
        ];
      }
    );
    builder.addMatcher(
      contactListAPIs.endpoints.removeList.matchFulfilled,
      (state, action) => {
        console.log("Removed Lists", action.payload);
        const removedLists = action.payload.map( list => list.id );

        state.contactLists = state.contactLists.filter(
          (list) => !removedLists.includes(list.id)
        );
      }
    );
  },
});

export default contactListSlice.reducer;
