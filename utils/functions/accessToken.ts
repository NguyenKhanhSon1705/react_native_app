import env from "@/constant/envConstant";
import { getCookie , setCookie , removeCookie } from "../cookies/cookies"

const getAccessToken = async () : Promise<string | undefined> => {
    return await getCookie(env.ACCESS_TOKEN);
}
const setAccessToken = async (token : string) : Promise<void> => {
    await setCookie(env.ACCESS_TOKEN , token);
}
const deleteAccessToken = async () : Promise<void> => {
    await removeCookie(env.ACCESS_TOKEN);
}

const accessToken = {
    getAccessToken,
    setAccessToken,
    deleteAccessToken
}
export default accessToken