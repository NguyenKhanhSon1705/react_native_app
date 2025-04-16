import * as SecureStore from 'expo-secure-store';

export const getCookieAsync = async (cookieName: string): Promise<string | undefined> => {
    const result = await SecureStore.getItemAsync(cookieName);
    return result ?? undefined;
};


export const setCookieAsync =async (cookieName : string, cookieValue : string,) : Promise<void>=> {
    await SecureStore.setItemAsync(cookieName , cookieValue)
}
export const removeCookieAsync = async (cookieName : string) : Promise<void> => {
      await SecureStore.deleteItemAsync(cookieName)
}