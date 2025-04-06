import { IAppResposeBase } from "@/interfaces/appType";
import { IShopData } from "@/interfaces/shop/shopDTO";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";


const getListShopUser = createAsyncThunk(
    "shop/getListShopUser",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<IShopData[]>> => {
        try {
            const listShop = await httpRequest.get<IAppResposeBase<IShopData[]> >("/api/shop/get-list-shop");
            return listShop.data;
        } catch (error: any) {
            console.error("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    })

const shopAction = {
    getListShopUser
}
export default shopAction;