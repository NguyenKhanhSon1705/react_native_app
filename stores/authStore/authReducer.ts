import ICurrentUser from "@/interfaces/auth/currentUserType";
import accessToken from "@/utils/functions/accessToken";
import authThunks from "./authThunks";
import { createSlice } from "@reduxjs/toolkit";


export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    currentUser: ICurrentUser | null;
}

const initialState: AuthState = {
    token: accessToken.getAccessToken()?.toString() || null,
    isAuthenticated: false,
    loading: false,
    error: null,
    currentUser: null,
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder.addCase(authThunks.getCurrentUser.pending, (state)=>{
            state.loading = true;
        })
        .addCase(authThunks.getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.data ?? null;
            state.isAuthenticated = true;
            state.loading = false;
        })
        .addCase(authThunks.getCurrentUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false;
        })
    }
})

export const authAction = {
    ...authSlice.actions , 
    ...authThunks
}
export default authSlice.reducer;