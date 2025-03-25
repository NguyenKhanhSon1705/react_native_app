import * as SecureStore from 'expo-secure-store';

export const getCookie =async (cookieName : string) : Promise<string | undefined >=>{
    const result = await SecureStore.getItemAsync(cookieName) ?? undefined
    return result;
}

export const setCookie = async (cookieName : string, cookieValue : string,) : Promise<void>=> {
    await SecureStore.setItemAsync(cookieName , cookieValue)
}
export const removeCookie = async (cookieName : string) : Promise<void> => {
     await SecureStore.deleteItemAsync(cookieName)
}