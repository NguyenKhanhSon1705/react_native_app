import { IAppResposeBase } from "@/interfaces/appType";
import ICurrentUser from "@/interfaces/auth/currentUserType";
import httpRequest from "@/utils/axios/axiosCustom";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<ICurrentUser | undefined>> => {
        try {
           const shopId = await cookiesIdShop.getCookieIdShop();
           const response = await httpRequest.get<IAppResposeBase<ICurrentUser>>(
          "/api/authen/get-current-user",
          {
            params: { shopId }
          }
        );

          return response.data;
        } catch (error: any) {
            console.error('Lỗi',error)
          return rejectWithValue(error.data) as any;
        }
      }
)

const authThunks = {
    getCurrentUser
}

export default authThunks;