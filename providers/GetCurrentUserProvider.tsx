import { authAction } from "@/stores/authStore/authReducer";
import accessToken from "@/utils/functions/accessToken";
import { JSX, useEffect } from "react";
import { useDispatch } from "react-redux";
const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
    // const accToken = accessToken.getAccessToken();
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     if(!accToken) return;
    //     dispatch<any>(authAction.getCurrentUser());
    // },[accToken , dispatch])
    return children
}

export default GetCurrentUserProvider;