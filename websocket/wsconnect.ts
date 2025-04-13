import env from "@/constant/envConstant";
import accessToken from "@/utils/functions/accessToken";
import * as signalR from "@microsoft/signalr";
const WsConnect = (areaId: string | number) => {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`${env.API_URL}/ordertablearea?areaId=${areaId}`, // thay bằng URL thực tế
            {
                accessTokenFactory: () => {
                    const token = accessToken.getAccessToken();
                    return token || "";
                },
            }) // thay bằng URL thực tế
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

    return connection;
}
export default WsConnect;