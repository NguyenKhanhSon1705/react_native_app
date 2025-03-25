
import { ILoginRequestData, ILoginResponseData } from "@/interfaces/auth/LoginType";
import httpRequest from "@/utils/axios/axiosCustom";
const login = async (login: ILoginRequestData) => {
    try {
        const res = await httpRequest.post('/api/authen/login', login);
        return res;
    } catch (err: any) {
        return err
    }
}
const getCurrentUser = async (): Promise<ILoginResponseData> => {
    // Simulate API request
    return new Promise((resolve, reject) => {
        setTimeout(() => {

        }, 1000);
    });
}
const authService = {
    login,
    getCurrentUser
}
export default authService