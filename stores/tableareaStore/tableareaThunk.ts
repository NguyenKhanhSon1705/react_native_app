import { IAppResposeBase } from "@/interfaces/appType";
import { ITableAreaData } from "@/interfaces/tablearea/tableareaType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getTableAreaData = createAsyncThunk(
    "tablearea/getTableAreaData",
    async (areaid:number, { rejectWithValue }): Promise<IAppResposeBase<ITableAreaData[]>> => {
        try {
            const response = await httpRequest.get<IAppResposeBase<ITableAreaData[]>>(`/api/tablearea/get-tables-by-area` , {
                params: {
                    areaId: areaid
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const tableAreaAction = {
    getTableAreaData,
};

export default tableAreaAction;