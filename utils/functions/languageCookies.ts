import env from "@/constant/envConstant"
import { getCookie, setCookie } from "../cookies/cookies"

const setLanguageCookie = (value :string): void => {
    setCookie(env.LANGUAGE , value)
}

const getLanguageCookie = (): Promise<string | undefined> =>{
    return getCookie(env.LANGUAGE)
}

const languagesCookies = {
    setLanguageCookie,
    getLanguageCookie
}   
export default languagesCookies