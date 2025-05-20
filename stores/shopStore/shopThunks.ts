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


const createShop = createAsyncThunk (
    "shop/create-shop",
    async(params: FormData,{rejectWithValue}): Promise<IAppResposeBase<IShopData>> => {
        try {
            const response = await httpRequest.post<IAppResposeBase<IShopData>>("/api/shop/create-shop",params);
            return response.data
        } catch (error:any) {
            console.error("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
)
const updateShop = createAsyncThunk (
    "shop/update-shop",
    async(params: FormData,{rejectWithValue}): Promise<IAppResposeBase<IShopData>> => {
        try {
            const response = await httpRequest.put<IAppResposeBase<IShopData>>("/api/shop/update-shop",params);
            return response.data
        } catch (error:any) {
            console.error("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
)

const deleteShop = createAsyncThunk (
    "shop/delete-shop",
    async({ id, password }: { id: number; password: string },{rejectWithValue}): Promise<IAppResposeBase<IShopData>> => {
        try {
            const response = await httpRequest.delete<IAppResposeBase<IShopData>>(`/api/shop/delete-shop?id=${id}&password=${password}`);
            return response.data
        } catch (error:any) {
            console.error("API Error:", error);
            return rejectWithValue(error.data) as any;
        }
    }
)
const shopAction = {
    getListShopUser,
    createShop,
    updateShop,
    deleteShop
}
export default shopAction;