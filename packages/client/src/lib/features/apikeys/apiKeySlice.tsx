import { createSlice } from "@reduxjs/toolkit";
import { APIKeyAPIs } from "./keysApis";
import { string } from "zod";

type APIKey = {
  api_key: string;
  created_by: string;
  created_at: string;
};
interface InitialStateI {
  APIKeys: APIKey[];
}

const initialState: InitialStateI = {
  APIKeys: [],
};

const APIKeySlice = createSlice({
  name: "API",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      APIKeyAPIs.endpoints.getAPIKeys.matchFulfilled,
      (state, action) => {
        state.APIKeys = action.payload;
      }
    );
    builder.addMatcher(
      APIKeyAPIs.endpoints.generateAPIKey.matchFulfilled,
      (state, action) => {
        console.log("Payload", action.payload);
        state.APIKeys = [
          {
            api_key: action.payload.api_key,
            created_at: action.payload.created_at,
            created_by: action.payload.created_by,
          },
          ...state.APIKeys,
        ];
      }
    );
    builder.addMatcher(
      APIKeyAPIs.endpoints.invokeAPIKeys.matchFulfilled,
      (state, action) => {
        console.log("Payload", action.payload);
        const formattedKeys = action.payload.maps(
          (elem: { api_key: string }) => elem.api_key
        );
        state.APIKeys = state.APIKeys.filter((ele) =>
         formattedKeys.includes(ele.api_key)
        );
      }
    );
  },
});

export default APIKeySlice.reducer;
