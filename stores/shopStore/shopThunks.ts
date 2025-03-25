import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getListShopUser = createAsyncThunk ( 
    "shop/getListShopUser",
    async (_, { rejectWithValue }): Promise<void> => {
        try {
          const user = await httpRequest.get("/api/authen/get-current-user");
          
        } catch (error: any) {
          return rejectWithValue(error.data) as any;
        }
      })
const shopAction = {
    getListShopUser
}
export default shopAction;