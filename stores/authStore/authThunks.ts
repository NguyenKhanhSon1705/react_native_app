import { IAppResposeBase } from "@/interfaces/appType";
import ICurrentUser from "@/interfaces/auth/currentUserType";
import httpRequest from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }): Promise<IAppResposeBase<ICurrentUser | null>> => {
        try {
          const user: IAppResposeBase<ICurrentUser> = await httpRequest.get("/api/authen/get-current-user");
          return user;
        } catch (error: any) {
          return rejectWithValue(error.data) as any;
        }
      }
)

const authThunks = {
    getCurrentUser
}

export default authThunks;