import { ILoginRequestData } from "@/interfaces/auth/LoginType";

const login = async (login : ILoginRequestData) : Promise<ILoginRequestData> =>{
    // Simulate API request
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(login);
        }, 1000);
    });
}

const authService =  {
    login,
}
export default authService