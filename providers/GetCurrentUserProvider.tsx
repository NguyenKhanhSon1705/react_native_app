import { AppDispatch } from "@/stores";
import { authAction } from "@/stores/authStore/authReducer";
import accessToken from "@/utils/functions/accessToken";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import { JSX, useEffect } from "react";
import { useDispatch } from "react-redux";
const GetCurrentUserProvider = ({ children }: { children: JSX.Element }) => {
    const accToken = accessToken.getAccessToken();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if(!accToken) return;
        const fetchAndDispatch = async () => {
            const shopId = await cookiesIdShop.getCookieIdShop();
            dispatch(authAction.getCurrentUser(shopId ?? 5));
        };
        fetchAndDispatch();
    },[dispatch, accToken])
    return children
}

export default GetCurrentUserProvider;