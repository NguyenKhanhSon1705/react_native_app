export interface ILoginRequestData{
    email: string,
    password: string,
    isRememberMe?: boolean
}
export interface ILoginResponseData{
    accessToken: {
        token:string,
        expiresAt: string,
        expiresAtUtc: string,
    },
    userInfo: {
        fullname: string,
        email: string,
        userId: string,
        role: {
            roleName:string,
            displayName:string,
        },
    }
}