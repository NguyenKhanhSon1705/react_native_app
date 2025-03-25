import { IAppResposeBase } from "@/interfaces/appType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface ListShop {
    id: string;
    shopName: string;
    shopPhone: string;
    logoShop: string;
    shopAddress: string;
    isActive: boolean;
}

const getListShopUser = createAsyncThunk(
    "shop/getListShopUser",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<ListShop>> => {
        try {
            const listShop: IAppResposeBase<ListShop> = await httpRequest.get("/api/shop/get-list-shop");
            return listShop;
        } catch (error: any) {
            return rejectWithValue(error.data) as any;
        }
    })

const shopAction = {
    getListShopUser
}
export default shopAction;