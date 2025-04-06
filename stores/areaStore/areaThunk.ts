import { IAppResposeBase } from "@/interfaces/appType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AreaData,addAreaData,editAreaData } from "@/interfaces/area/AreaTypes";
import cookiesIdShop from "@/utils/functions/cookieIdShop";

const getAreaData = createAsyncThunk(
    "area/getAreaData",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<AreaData[]>> => {
        try {
            const shopId = await cookiesIdShop.getCookieIdShop();
            console.log("shoID",shopId);
            const response = await httpRequest.get<IAppResposeBase<AreaData[]>>(`/api/areas/get-list-areas` , {
                params: {
                    idShop: shopId
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const addArea = createAsyncThunk(
    "area/addArea",
    async (newArea: addAreaData, { rejectWithValue }) => {
        try {
            const shopId = await cookiesIdShop.getCookieIdShop();
            newArea.idShop = shopId ?? 0;
            const response = await httpRequest.post<IAppResposeBase<AreaData>>(
                "/api/areas/create-area",
                newArea
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const updateArea = createAsyncThunk(
    "area/updateArea",
    async (areaData: editAreaData, { rejectWithValue }) => {
        try {
            const shopId = await cookiesIdShop.getCookieIdShop();
            areaData.idShop = shopId ?? 0;
            const response = await httpRequest.put<IAppResposeBase<AreaData>>(
                "/api/areas/update-area",
                areaData
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const deleteArea = createAsyncThunk(
    "area/deleteArea",
    async (areaId: number, { rejectWithValue }) => {
        try {
            const response = await httpRequest.delete<IAppResposeBase<AreaData>>(
                `/api/areas/delete-area?id=${areaId}`
            );
            return { ...response.data, areaId };
        } catch (error: any) {
            console.error("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
);

const areaAction = {
    getAreaData,
    addArea,
    updateArea,
    deleteArea
};

export default areaAction;