// hooks/useTableSignalR.ts
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import WsConnect from "./wsconnect";
import { updateTablesArea } from "@/stores/tableareaStore/tableareaReducer";
import { ITableAreaData } from "@/interfaces/tablearea/tableareaType";

export const useTableAreaWebsocket = (areaId: string | number) => {
    const connectionRef = useRef<signalR.HubConnection | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const connect = async () => {
            const connection = WsConnect(areaId);
            connectionRef.current = connection;
            try {
                await connection.start();
                console.log("✅ SignalR connected");
                // Nghe sự kiện từ server
                connection.on("TableUpdated", (updatedData : ITableAreaData[]) => {
                    dispatch(updateTablesArea(updatedData)); // đưa vào redux
                });
            } catch (err) {
                console.error("❌ SignalR error:", err);
            }
        };

        connect();

        return () => {
            const conn = connectionRef.current;
            if (conn) {
                conn.stop();
                conn.off("TableUpdated");
            }
        };
    }, [areaId]);
};
