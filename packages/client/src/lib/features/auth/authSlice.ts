import { createSlice } from "@reduxjs/toolkit";
import { authAPIs } from "./authApis";
import { userAPIs } from "../user/userApis";

export type PermissionAction = "create" | "read" | "update" | "delete" | "manage";

export type PermissionResource =
  | "organization"
  | "project"
  | "analytics"
  | "campaigns"
  | "contact-lists"
  | "templates"
  | "transactionals";

export type Permission = `${PermissionResource}:${PermissionAction}`;

export type PermissionsMap = { [feature: string]: PermissionAction[] };

interface IinitialState {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    img_url?: string | null;
    role: string;
    contact?: string;
    permissions: string[];
  } | null;

  defaultProject: {
    project_access_id: string;
    project_id: string;
    project_name: string;
    project_role: string;
    project_status: string;
    role_id: number;
    default_mail_from: string;
    project_permissions: string[];
  } | null;
  isLoggedIn: boolean;
  permissions: PermissionsMap;
}

const initialState: IinitialState = {
  user: null,
  defaultProject: null,
  isLoggedIn: false,
  permissions: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      authAPIs.endpoints.checkLogin.matchFulfilled,
      (state, action) => {
        state.user = action.payload.user;
        state.defaultProject = action.payload.defaultProject;
        const permissions: string[] =
          action.payload.defaultProject.project_permissions;
        const groupedPermissions = permissions.reduce(
          (acc: PermissionsMap, permission) => {
            const [feature, action] = permission.split(":") as [
              string,
              PermissionAction,
            ];
            if (!acc[feature]) {
              acc[feature] = [];
            }

            if (!acc[feature].includes(action)) {
              acc[feature].push(action);
            }
            return acc;
          },
          {} as PermissionsMap
        );

        state.permissions = groupedPermissions;

        state.isLoggedIn = true;
      }
    );

    builder.addMatcher(
      authAPIs.endpoints.logout.matchFulfilled,
      (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
      }
    );

    builder.addMatcher(
      userAPIs.endpoints.updateProfile.matchFulfilled,
      (state, action) => {
        state.user = { ...state.user, ...action.payload };
      }
    );
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
