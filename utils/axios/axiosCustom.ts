import axios from "axios";
import getAccessToken from "../functions/getAccessToken";
import Toast from "react-native-toast-message";
import env from "@/constant/envConstant";
const httpRequest = axios.create({
    baseURL: env.API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
      },
    withCredentials: true
  });

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    if(getAccessToken() !== undefined){
        config.headers["Authorization"] = `Bearer ${getAccessToken()}`;  // Add token to headers if exist in local storage.
    }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if(error.status){
        Toast.show({
            type: "error",
            text1: "Có lỗi axiosCustom",
            text2: "Có lỗi axiosCustom response.use",
        })
    }
    return Promise.reject(error);
  });

export default httpRequest;