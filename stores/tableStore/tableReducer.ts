import tableAction from "./tableThunk";
import { ITableData } from "@/interfaces/table.ts/TableTypes";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
interface tableState {
    tables: ITableData[];
    loading: boolean;
    error: string | null;
}

const initialState: tableState = {
    tables: [],
    loading: false,
    error: null,
};

const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách 
            .addCase(tableAction.getTableData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tableAction.getTableData.fulfilled, (state, action) => {           
                state.tables = action.payload.data || [];
                state.loading = false;
            })
            .addCase(tableAction.getTableData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }) 

            // Thêm
            .addCase(tableAction.addTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tableAction.addTable.fulfilled, (state, action) => {    
                if (action.payload.isSuccess) {
                    Toast.show({
                        type: "success",
                        text1: action.payload.message,
                    });
                    if (action.payload.data) {
                        state.tables.push(action.payload.data as ITableData);
                    }       
                } else {
                    Toast.show({
                        type: "error",
                        text1: action.payload.message,
                    });
                }  
                state.loading = false;
            })
            .addCase(tableAction.addTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

             // Cập nhật 
             .addCase(tableAction.updateTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tableAction.updateTable.fulfilled, (state, action) => {      
                if (action.payload.isSuccess) {
                    Toast.show({
                        type: "success",
                        text1: action.payload.message,
                    });
                    if (action.payload.data) {
                        const updatedArea = action.payload.data as ITableData;
                        const index = state.tables.findIndex(area => area.id === updatedArea.id);
                        if (index !== -1) {
                            state.tables[index] = updatedArea;
                        }
                    }
                } else {
                    Toast.show({
                        type: "error",
                        text1: action.payload.message,
                    });
                } 
               
                state.loading = false;
            })
            .addCase(tableAction.updateTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Xoas 
            .addCase(tableAction.deleteTable.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(tableAction.deleteTable.fulfilled, (state, action) => {   
                if (action.payload.isSuccess) {
                    Toast.show({
                        type: "success",
                        text1: action.payload.message,
                    });
                    if (action.payload.isSuccess) {
                        const tableId = action.payload.TableId;
                        state.tables = state.tables.filter(table => table.id !== tableId);
                    }
                } else {
                    Toast.show({
                        type: "error",
                        text1: action.payload.message,
                    });
                }         
                state.loading = false;
            })
            .addCase(tableAction.deleteTable.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });


          
    },
});

export const tableReducer = tableSlice.reducer;