
import { IAppResposeBase } from "@/interfaces/appType";
import { ITableDishData } from "@/interfaces/tabledish/tabledishType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getTableDishData = createAsyncThunk(
    "tabledish/getTableDishData",
    async (tableid:number, { rejectWithValue }): Promise<IAppResposeBase<ITableDishData>> => {
        try {
            const response = await httpRequest.get<IAppResposeBase<ITableDishData>>(`/api/ordertabledish/get-dish-table` , {
                params: {
                    tableId: tableid
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const tabledishAction = {
    getTableDishData,
};

export default tabledishAction;