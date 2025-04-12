// hooks/useTableSignalR.ts
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import WsConnect from "./wsconnect";
import { updateTablesArea } from "@/stores/tableareaStore/tableareaReducer";
import { ITableAreaData } from "@/interfaces/tablearea/tableareaType";
import Toast from "react-native-toast-message";

export const useTableAreaWebsocket = (areaId?: string | number) => {
    const connectionRef = useRef<signalR.HubConnection | null>(null);
    const isStartedRef = useRef(false); // ✅ Flag kiểm tra đã start chưa
    const dispatch = useDispatch();

    useEffect(() => {
        if (!areaId) {
            return;
        }

        const connect = async () => {
            const connection = WsConnect(areaId);
            connectionRef.current = connection;

            try {
                await connection.start();
                isStartedRef.current = true; 
                console.log("SignalR connected");

                connection.on("TableUpdated", (updatedData: ITableAreaData[]) => {
                    dispatch(updateTablesArea(updatedData));
                    Toast.show({
                        type: "success",
                        text1: "Cập nhật thành công",
                        text2: "Đã cập nhật trạng thái bàn",
                        position: "top",
                        visibilityTime: 3000,
                        autoHide: true,
                    });
                });
            } catch (err) {
                console.error("SignalR connection error:", err);
                Toast.show({
                    type: "error",
                    text1: "Lỗi kết nối",
                    text2: "Không thể kết nối tới server",
                    position: "top",
                    visibilityTime: 3000,
                    autoHide: true,
                });
            }
        };

        connect();

        return () => {
            const conn = connectionRef.current;
            if (conn) {
                conn.off("TableUpdated");

                // ✅ Chỉ stop nếu đã start
                if (isStartedRef.current) {
                    conn.stop()
                        .then(() => console.log("SignalR connection stopped"))
                        .catch((err) =>
                            console.error("Error stopping SignalR connection:", err)
                        );
                }
            }
        };
    }, [areaId, dispatch]);
};
