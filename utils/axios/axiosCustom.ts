import axios from "axios";
import env from "@/constant/envConstant";
import accessToken from "../functions/accessToken";

const httpRequest = axios.create({
  baseURL: env.API_URL,
});

// Add a request interceptor
httpRequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = accessToken.getAccessToken();
    if(token !== undefined){
        config.headers["Authorization"] = `Bearer ${token}`;  // Add token to headers if exist in local storage.
    }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
httpRequest.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error.response);
});
export default httpRequest;
