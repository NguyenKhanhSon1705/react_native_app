import { createSlice } from "@reduxjs/toolkit";
import shopAction from './shopThunks'
import { IShopData } from "@/interfaces/shop/shopDTO";

interface ShopState {
    shops: IShopData[],
    loading: boolean,
    error: string | null,
}

const initialState: ShopState = {
    shops: [],
    loading: false,
    error: null,
};

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách 
            .addCase(shopAction.getListShopUser.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(shopAction.getListShopUser.fulfilled, (state, action) => {
                state.shops = action.payload.data || [];
                state.loading = false;
            })
            .addCase(shopAction.getListShopUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const shopReducer = shopSlice.reducer;