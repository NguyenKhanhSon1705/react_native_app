import { createSlice } from "@reduxjs/toolkit";
import dishAction from "./dishThunk";
import { AreaData, addAreaData, editAreaData } from "@/interfaces/area/AreaTypes";
import { IDishData, IMenuGroupInfo } from "@/interfaces/dish/dishType";

interface AreaState {
    dish: IDishData | null;
    menuGroup: IMenuGroupInfo[]
    loading: boolean;
    error: string | null;
}

const initialState: AreaState = {
    dish: null,
    menuGroup: [],
    loading: false,
    error: null,
};

const dishSlice = createSlice({
    name: "dish",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách món ăn
            .addCase(dishAction.getDishInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dishAction.getDishInfo.fulfilled, (state, action) => {
                state.dish = action.payload.data || null;
                state.loading = false;
            })
            .addCase(dishAction.getDishInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        builder
            // Lấy danh sách 
            .addCase(dishAction.getMenuGroupInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dishAction.getMenuGroupInfo.fulfilled, (state, action) => {
                state.menuGroup = action.payload.data || [];
                state.loading = false;
            })
            .addCase(dishAction.getMenuGroupInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const dishReducer = dishSlice.reducer;