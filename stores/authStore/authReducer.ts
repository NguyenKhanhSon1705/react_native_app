import ICurrentUser from "@/interfaces/auth/currentUserType";
import accessToken from "@/utils/functions/accessToken";
import { createSlice } from "@reduxjs/toolkit";
import authThunks from "./authThunks";


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
            state.loading = false;
            // state.currentUser = action.payload;
            state.isAuthenticated = true;
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