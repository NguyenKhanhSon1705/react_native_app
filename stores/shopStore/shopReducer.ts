import { createSlice } from "@reduxjs/toolkit";
import shopAction from './shopThunks'
import { IShopData } from "@/interfaces/shop/shopDTO";
import Toast from "react-native-toast-message";

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

        // Thêm shop mới
        builder
            .addCase(shopAction.createShop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shopAction.createShop.fulfilled, (state, action) => {
                if(action.payload.isSuccess){
                    Toast.show({
                    type: "success",
                    text1: action.payload.message,
                });
                if (action.payload.data) {
                    state.shops.push(action.payload.data);
                }
            }
            else{
                Toast.show({
                    type: "error",
                    text1: action.payload.message,                  
                });
               }            
                state.loading = false;
            })
            .addCase(shopAction.createShop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

        // Cập nhật shop
        builder
            .addCase(shopAction.updateShop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shopAction.updateShop.fulfilled, (state, action) => {
                if(action.payload.isSuccess){
                        Toast.show({
                        type: "success",
                        text1: action.payload.message,
                    });
                    const updatedShop = action.payload.data;
                if (updatedShop) {
                    const index = state.shops.findIndex(shop => shop.id === updatedShop.id);
                    if (index !== -1) {
                        state.shops[index] = updatedShop;
                    }
                  }
                }
                else{
                    Toast.show({
                        type: "error",
                        text1: action.payload.message,                  
                    });
                   }         
                state.loading = false;
            })
            .addCase(shopAction.updateShop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

        // Xóa shop
        builder
            .addCase(shopAction.deleteShop.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(shopAction.deleteShop.fulfilled, (state, action) => {
                if(action.payload.isSuccess){
                    Toast.show({
                    type: "success",
                    text1: action.payload.message,                  
                });
                state.shops = state.shops.filter(shop => shop.id !== action.payload.data?.id);
               }
               else{
                Toast.show({
                    type: "error",
                    text1: action.payload.message,                  
                });
               }
               
                state.loading = false;
            })
            .addCase(shopAction.deleteShop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export const shopReducer = shopSlice.reducer;