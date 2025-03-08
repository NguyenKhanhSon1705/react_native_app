import { getCookie } from "../cookies/cookies"

const getAccessToken = () : Promise<string | undefined> => {
    return getCookie("access_token");
}
export default getAccessToken