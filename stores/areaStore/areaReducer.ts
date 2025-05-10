
import { createSlice } from "@reduxjs/toolkit";
import areaAction from "./areaThunk";
import { AreaData,addAreaData,editAreaData } from "@/interfaces/area/AreaTypes";

interface AreaState {
    areas: AreaData[];
    loading: boolean;
    error: string | null;
}

const initialState: AreaState = {
    areas: [],
    loading: false,
    error: null,
};

const areaSlice = createSlice({
    name: "area",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Lấy danh sách 
            .addCase(areaAction.getAreaData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(areaAction.getAreaData.fulfilled, (state, action) => {           
                state.areas = action.payload.data || [];
                state.loading = false;
            })
            .addCase(areaAction.getAreaData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            // Thêm 
            .addCase(areaAction.addArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(areaAction.addArea.fulfilled, (state, action) => {       
                if (action.payload.data) {
                    state.areas.push(action.payload.data as AreaData);
                }
                state.loading = false;
            })
            .addCase(areaAction.addArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            // Cập nhật 
            .addCase(areaAction.updateArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(areaAction.updateArea.fulfilled, (state, action) => {       
                if (action.payload.data) {
                    const updatedArea = action.payload.data as AreaData;
                    const index = state.areas.findIndex(area => area.id === updatedArea.id);
                    if (index !== -1) {
                        state.areas[index] = updatedArea;
                    }
                }
                state.loading = false;
            })
            .addCase(areaAction.updateArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            // Xoas 
            .addCase(areaAction.deleteArea.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(areaAction.deleteArea.fulfilled, (state, action) => {            
                if (action.payload.isSuccess) {
                    const areaId = action.payload.areaId;
                    state.areas = state.areas.filter(area => area.id !== areaId);
                }
                state.loading = false;
            })
            .addCase(areaAction.deleteArea.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const areaReducer = areaSlice.reducer;