import { IAppResposeBase } from "@/interfaces/appType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ITableData,ITableRequest } from "@/interfaces/table.ts/TableTypes";


const getTableData = createAsyncThunk(
    "table/getTableData",
    async (shopId: number, { rejectWithValue }): Promise<IAppResposeBase<ITableData[]>> => {
        try {
            const response = await httpRequest.get<IAppResposeBase<ITableData[]>>(`/api/tables/get-table-area?shopId=${shopId}`);
            return response.data;
        } catch (error: any) {
            console.log("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
);

const addTable = createAsyncThunk(
    "Table/addTable",
    async (newTable: ITableRequest, { rejectWithValue }) => {
        try {
            const response = await httpRequest.post<IAppResposeBase<ITableRequest>>(
                "/api/tables/create-tables",
                newTable
            );
            return response.data;
        } catch (error: any) {
            console.log("API Error:", error.data);
            return rejectWithValue(error.data) as any;
        }
    }
);

const updateTable = createAsyncThunk(
    "Table/updateTable",
    async (TableData: ITableRequest, { rejectWithValue }) => {
        try {
            const response = await httpRequest.put<IAppResposeBase<ITableRequest>>(
                "/api/tables/update-tables",
                TableData
            );
            return response.data;
        } catch (error: any) {
            console.log("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
);

const deleteTable = createAsyncThunk(
    "Table/deleteTable",
    async (TableId: number, { rejectWithValue }) => {
        try {
            const response = await httpRequest.delete<IAppResposeBase<ITableRequest>>(
                `/api/tables/delete-tables?id=${TableId}`
            );
            return { ...response.data, TableId };
        } catch (error: any) {
            console.log("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
);





const tableAction = {
    getTableData,
    addTable,
    updateTable,
    deleteTable

};

export default tableAction;