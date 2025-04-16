import { IAppResposeBase } from "@/interfaces/appType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import { IDishData, IDishDTO, IMenuGroupInfo } from "@/interfaces/dish/dishType";

const getDishInfo = createAsyncThunk(
    "dish/getAllDish",
    async (param: IDishDTO, { rejectWithValue }): Promise<IAppResposeBase<IDishData>> => {
        try {
            const shopId = await cookiesIdShop.getCookieIdShop();
            console.log("menuGroupId", param.menuGroupId)
            const response = await httpRequest.get<IAppResposeBase<IDishData>>(`/api/dish/get-dish-menugroup`, {
                params: {
                    "pageIndex": param.pageIndex,
                    "pageSize": param.pageSize,
                    "search": param.search,
                    "menuGroupId": param.menuGroupId,
                    "shopId": shopId
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const getMenuGroupInfo = createAsyncThunk(
    "dish/getMenuGroupInfo",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<IMenuGroupInfo[]>> => {
        try {
            const shopId = await cookiesIdShop.getCookieIdShop();
            const response = await httpRequest.get<IAppResposeBase<IMenuGroupInfo[]>>(`/api/menugroup/get-all-name-menu-group`, {
                params: {
                    shopId
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    }
);

const dishAction = {
    getDishInfo,
    getMenuGroupInfo
};

export default dishAction;