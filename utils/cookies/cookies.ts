import * as SecureStore from 'expo-secure-store';

export const getCookie = (cookieName : string) : string | undefined =>{
    const result = SecureStore.getItem(cookieName) ?? undefined
    return result;
}

export const setCookie = (cookieName : string, cookieValue : string,) : void=> {
     SecureStore.setItem(cookieName , cookieValue)
}
export const removeCookie = async (cookieName : string) : Promise<void> => {
      await SecureStore.deleteItemAsync(cookieName)
}