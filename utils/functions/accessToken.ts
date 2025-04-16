import env from "@/constant/envConstant";
import { getCookie, setCookie, removeCookie } from "../cookies/cookies"

const getAccessToken = (): string | undefined => {
    return getCookie(env.ACCESS_TOKEN);
}
const setAccessToken = (token: string): void => {
    setCookie(env.ACCESS_TOKEN, token);
}
const deleteAccessToken = async (): Promise<void> => {
    await removeCookie(env.ACCESS_TOKEN);
}

const accessToken = {
    getAccessToken,
    setAccessToken,
    deleteAccessToken
}
export default accessToken