import { IAppResposeBase } from "@/interfaces/appType";
import ICurrentUser from "@/interfaces/auth/currentUserType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (shopId:number, { rejectWithValue }): Promise<IAppResposeBase<ICurrentUser | undefined>> => {
        try {
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