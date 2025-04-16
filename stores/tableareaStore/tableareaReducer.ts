import { createSlice } from "@reduxjs/toolkit";
import tableAreaAction from "./tableareaThunk";
import { ITableAreaData } from "@/interfaces/tablearea/tableareaType";
interface tableState {
    tablearea: ITableAreaData[];
    loading: boolean;
    error: string | null;
}

const initialState: tableState = {
    tablearea: [],
    loading: false,
    error: null,
};

const tableAreaSlice = createSlice({
    name: "tablearea",
    initialState,
    reducers: {
        updateTablesArea: (state, action) => {
            state.tablearea = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Lấy danh sách 
            .addCase(tableAreaAction.getTableAreaData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tableAreaAction.getTableAreaData.fulfilled, (state, action) => {
                state.tablearea = action.payload.data || [];
                state.loading = false;
            })
            .addCase(tableAreaAction.getTableAreaData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});
export const { updateTablesArea } = tableAreaSlice.actions;

export const tableAreaReducer = tableAreaSlice.reducer;