import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenuGroupData, IMenuGroup } from "@/interfaces/menuGroup/MenuGroupTypes";
import menuGroupAction from "./menuGroupThunk";
import { IAppResposeBase } from "@/interfaces/appType";

interface MenuGroupState {
  menuGroupData: IMenuGroupData | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuGroupState = {
  menuGroupData: null,
  loading: false,
  error: null,
};

const menuGroupSlice = createSlice({
  name: "menuGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(menuGroupAction.getMenuGroupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(menuGroupAction.getMenuGroupData.fulfilled, (state, action) => {
        if (action.payload.data) { 
            state.menuGroupData = action.payload.data; 
        }
        state.loading = false;
      })
      .addCase(menuGroupAction.getMenuGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch menu groups";
      })


      .addCase(menuGroupAction.addMenuGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // The fulfilled action payload is IAppResposeBase<IMenuGroup>
      .addCase(menuGroupAction.addMenuGroup.fulfilled, (state, action: PayloadAction<IAppResposeBase<IMenuGroup>>) => {
        // Check if menuGroupData and payload data are defined and add type assertion
        if (state.menuGroupData && action.payload.data) {
          const newMenuGroup = action.payload.data as IMenuGroup; // Add type assertion
          state.menuGroupData.items.push(newMenuGroup); // Use the asserted type
        }
        state.loading = false;
      })
      .addCase(menuGroupAction.addMenuGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add menu group";
      })

//update
      .addCase(menuGroupAction.updateMenuGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(menuGroupAction.updateMenuGroup.fulfilled, (state, action) => {
        if (state.menuGroupData && action.payload.data) {
          const updatedMenuGroup = action.payload.data as IMenuGroup; 
          const index = state.menuGroupData.items.findIndex((group) => group.id === updatedMenuGroup.id);
          if (index !== -1) {
            state.menuGroupData.items[index] = updatedMenuGroup;
          }
        }
        state.loading = false;
      })
      .addCase(menuGroupAction.updateMenuGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update menu group";
      })



      // Handle deleteMenuGroup thunk
      .addCase(menuGroupAction.deleteMenuGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // The deleted ID is in action.meta.arg
      .addCase(menuGroupAction.deleteMenuGroup.fulfilled, (state, action) => {
        if (state.menuGroupData) {
          state.menuGroupData.items = state.menuGroupData.items.filter((group) => group.id !== action.meta.arg);
        }
        state.loading = false;
      })
      .addCase(menuGroupAction.deleteMenuGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete menu group";
      });
  },
});

export const menuGroupReducer = menuGroupSlice.reducer; 