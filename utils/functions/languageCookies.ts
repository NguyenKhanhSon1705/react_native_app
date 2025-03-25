import env from "@/constant/envConstant"
import { getCookie, setCookie } from "../cookies/cookies"

const setLanguageCookie = (value :string): void => {
    setCookie(env.LANGUAGE , value)
}

const getLanguageCookie = async (): Promise<string | undefined> => {
    const result = await getCookie(env.LANGUAGE);
    return result;
}

const languagesCookies = {
    setLanguageCookie,
    getLanguageCookie
}   
export default languagesCookies