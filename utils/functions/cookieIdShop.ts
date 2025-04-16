import env from "@/constant/envConstant";
import { getCookieAsync, removeCookieAsync, setCookieAsync } from "../cookies/cookiesAsync";
import Toast from "react-native-toast-message";

// ✅ GET
const getCookieIdShop = async (): Promise<number | undefined> => {
    const result = await getCookieAsync(env.SHOP_ID);
    if(!result){
        return;
    }
    const shopId = Number(result);
    return shopId
};

// ✅ SET
const setCookieIdShop = async (shopId: any): Promise<void> => {

    await setCookieAsync(env.SHOP_ID, ""+shopId);
};

// ✅ DELETE
const deleteCookieIdShop = async (): Promise<void> => {
    await removeCookieAsync(env.SHOP_ID);
};

const cookiesIdShop = {
    getCookieIdShop,
    setCookieIdShop,
    deleteCookieIdShop
}
export default cookiesIdShop