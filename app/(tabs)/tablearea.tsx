import React, { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Button, Surface } from "react-native-paper";
import Area from "@/components/tablearea/area";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import tableAreaAction from "@/stores/tableareaStore/tableareaThunk";
import WsConnect from "@/websocket/wsconnect";
import { useTableAreaWebsocket } from "@/websocket/wstablearea";

const TableArea = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [activeArea, setActiveArea] = useState<{ areaId?: number; areaName?: string }>({});
    const dispatch = useDispatch<AppDispatch>();
    useTableAreaWebsocket(activeArea.areaId ?? ""); 
    const tablearea = useSelector(
        (state: RootState) => state.tableAreaStore.tablearea,
        shallowEqual
    );

    useEffect(() => {
        if (!activeArea.areaId) return;
        dispatch(tableAreaAction.getTableAreaData(activeArea.areaId || 0));
    }, [dispatch, activeArea.areaId]);


    const handleOpenDrawer = useCallback(() => {
        setDrawerVisible(true);
    }, []);

    const handleCloseDrawer = useCallback(() => {
        setDrawerVisible(false);
    }, []);

    const handleSelectArea = useCallback((areaId: number, areaName: string) => {
        setActiveArea({ areaId, areaName });
    }, []);


    // websocket
    // const connection = WsConnect(activeArea.areaId || "");

    return (
        <View style={{ flex: 1 }}>
            <Button
                style={{
                    height: 45,
                    width: 100,
                    margin: 10,
                    borderColor: "#ccc",
                    borderWidth: 2,
                    borderRadius: 5,
                    cursor: "pointer",
                }}
                mode="outlined" onPress={handleOpenDrawer}>
                {activeArea.areaName ? activeArea.areaName : "Chọn khu vực"}
            </Button>
            <View style={styles.container}>
                {tablearea.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={() => console.log(item)}
                        style={styles.item}
                    >
                        <Surface style={[styles.surface, {
                            backgroundColor: item.isActive ? "#8cc1ec" : "#ffcccc",
                            borderColor: item.isActive ? "#ccc" : "#f6dede",
                            borderWidth: 2,
                        }]} elevation={1}>
                            <Text>{item.nameTable}</Text>
                        </Surface>
                    </Pressable>
                ))}
            </View>
            {/* Drawer khu vực */}
            <Area
                visible={drawerVisible}
                onClose={handleCloseDrawer}
                onSelectArea={handleSelectArea}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    item: {
        width: '33.33%',
        padding: 10,
        alignItems: 'center',
    },
    surface: {
        width: '100%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
    },
});

export default TableArea;
