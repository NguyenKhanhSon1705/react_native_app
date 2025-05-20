
import { IAppResposeBase } from "@/interfaces/appType";
import { IAbortOrder, ITableDishData, ITableDishDTO } from "@/interfaces/tabledish/tabledishType";
import httpRequest from "@/utils/axios/axiosCustom";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getTableDishData = createAsyncThunk(
    "tabledish/getTableDishData",
    async (tableid: number, { rejectWithValue }): Promise<IAppResposeBase<ITableDishData>> => {
        try {
            const response = await httpRequest.get<IAppResposeBase<ITableDishData>>(`/api/ordertabledish/get-dish-table`, {
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

const createTableDish = createAsyncThunk(
    "tabledish/createTableDish",
    async (data: ITableDishDTO, { rejectWithValue }): Promise<IAppResposeBase<ITableDishData>> => {
        try {
            const response = await httpRequest.post<IAppResposeBase<ITableDishData>>(`/api/ordertabledish/open-table-dish`, {
                tableId: data.tableId,
                listDishId: data.listDishId,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
)
const updateTableDish = createAsyncThunk(
    "tabledish/updateTableDish",
    async (data: ITableDishDTO, { rejectWithValue }): Promise<IAppResposeBase<ITableDishData>> => {
        try {
            const response = await httpRequest.post<IAppResposeBase<ITableDishData>>(`/api/ordertabledish/update-table-dish`, {
                tableId: data.tableId,
                listDishId: data.listDishId,
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
)

const abortTableDish = createAsyncThunk(
    "tabledish/abortTableDish",
    async (data: IAbortOrder, { rejectWithValue }): Promise<IAppResposeBase<ITableDishData>> => {
        try {
               const shopId = await cookiesIdShop.getCookieIdShop();
            const response = await httpRequest.post<IAppResposeBase<ITableDishData>>(`/api/ordertabledish/aborted-table`, {
                "shop_id": shopId,
                "table_Id": Number(data.table_Id),
                "reason_abort": data.reason_abort,
                "total_money": data.total_money,
                "total_quantity": data.total_quantity
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
)

const tabledishAction = {
    getTableDishData,
    createTableDish,
    abortTableDish,
    updateTableDish
};

export default tabledishAction;