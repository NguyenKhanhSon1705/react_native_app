import { createAsyncThunk } from "@reduxjs/toolkit";
import { IMenuGroupData, IMenuGroupDTO, IMenuGroup } from "@/interfaces/menuGroup/MenuGroupTypes";
import axios from "axios";
import { IAppResposeBase } from "@/interfaces/appType";
import httpRequest from "@/utils/axios/axiosCustom";
import cookiesIdShop from "@/utils/functions/cookieIdShop";

export const getMenuGroupData = createAsyncThunk(
  "menuGroup/getMenuGroupData",
  async (
    param: IMenuGroupDTO,
    { rejectWithValue }
  ): Promise<IAppResposeBase<IMenuGroupData>> => {
    try {
      const shopId = await cookiesIdShop.getCookieIdShop();
      const response = await httpRequest.get<IAppResposeBase<IMenuGroupData>>(
        `/api/menugroup/get-all-menu-group`,
        {
          params: {
            "pageIndex": param.pageIndex,
            "limit": param.limit,
            "search": param.search,
            "shopId": shopId
          }
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.data) as any;
    }
  }
);

export const addMenuGroup = createAsyncThunk(
  "menuGroup/addMenuGroup",
  async (data: IMenuGroup, { rejectWithValue }): Promise<IAppResposeBase<IMenuGroup>> => {
    try {
      const response = await httpRequest.post<IAppResposeBase<IMenuGroup>>(
        `/api/menugroup/add-menu-group`,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.data) as any;
    }
  }
);

export const updateMenuGroup = createAsyncThunk(
  "menuGroup/updateMenuGroup",
  async (data: IMenuGroup, { rejectWithValue }): Promise<IAppResposeBase<IMenuGroup>> => {
    try {
      const response = await httpRequest.put<IAppResposeBase<IMenuGroup>>(
        `/api/menugroup/update-menu-group/${data.id}`,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.data) as any;
    }
  }
);

export const deleteMenuGroup = createAsyncThunk(
  "menuGroup/deleteMenuGroup",
  async (id: number, { rejectWithValue }): Promise<void> => {
    try {
      await httpRequest.delete(`/api/menugroup/delete-menu-group/${id}`);
      return;
    } catch (error: any) {
      return rejectWithValue(error.data) as any;
    }
  }
);

const menuGroupAction = {
  getMenuGroupData,
  addMenuGroup,
  updateMenuGroup,
  deleteMenuGroup,
};

export default menuGroupAction; 