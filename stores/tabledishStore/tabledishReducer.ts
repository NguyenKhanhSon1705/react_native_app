import { createSlice } from "@reduxjs/toolkit";
import { ITableAreaData } from "@/interfaces/tablearea/tableareaType";
import tabledishAction from "./tabledishThunk";
import { ITableDishData } from "@/interfaces/tabledish/tabledishType";
interface tableState {
    tabledish: ITableDishData;
    loading: boolean;
    error: string | null;
}

const initialState: tableState = {

    tabledish:{} as ITableDishData,
    loading: false,
    error: null,
};

const tabledishSlice = createSlice({
    name: "tabledish",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách 
            .addCase(tabledishAction.getTableDishData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tabledishAction.getTableDishData.fulfilled, (state, action) => {
                state.tabledish = action.payload.data || ({} as ITableDishData);
                state.loading = false;
            })
            .addCase(tabledishAction.getTableDishData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});
// export const { updateTablesArea } = tabledishSlice.actions;

export const tableDishReducer = tabledishSlice.reducer;