import * as SecureStore from 'expo-secure-store';

export const getCookie =async (cookieName : string) : Promise<string | undefined >=>{
    const result = await SecureStore.getItemAsync(cookieName) ?? undefined;
    console.log("language: " + result);
    return result;
}

export const setCookie =  (cookieName : string, cookieValue : string,) : void => {
     SecureStore.setItemAsync(cookieName , cookieValue).then((res) => res )
}
export const removeCookie =   (cookieName : string) : void => {
     SecureStore.deleteItemAsync(cookieName)
}