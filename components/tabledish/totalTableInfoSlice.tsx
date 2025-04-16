import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';
import { Avatar, Button, Drawer, Surface } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';
import { useTableAreaWebsocket } from '@/websocket/wstablearea';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ITableDishData } from '@/interfaces/tabledish/tabledishType';
import { MaterialIcons } from '@expo/vector-icons';
const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.7;
import { format } from 'date-fns';
type Props = {
    visible: boolean;
    table: ITableDishData
    onClose: () => void;
    onSelectArea?: (areaId: number, areaName: string) => void;
};


const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0');
    return `${h}:${m}:${s}`;
};


const TotalTableInfoSlice = ({ visible, onClose, table }: Props) => {
    const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;
    const dispatch = useDispatch<AppDispatch>();

    const [isDrawerVisible, setDrawerVisible] = useState(false);

    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (table.timeStart) {
            const start = new Date(table.timeStart).getTime();
            const updateDuration = () => {
                const now = new Date().getTime();
                const seconds = Math.floor((now - start) / 1000);
                setDuration(seconds);
            };

            updateDuration();
            const interval = setInterval(updateDuration, 1000);
            return () => clearInterval(interval);
        }
    }, [table.timeStart]);

    useEffect(() => {
        dispatch(areaAction.getAreaData());
    }, [dispatch]);
    useEffect(() => {
        if (visible) {
            setDrawerVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -drawerWidth,
                duration: 100,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setDrawerVisible(false);
                onClose();
            });
        }
    }, [visible]);


    const handleBackdropPress = useCallback(() => {
        Animated.timing(slideAnim, {
            toValue: -drawerWidth,
            duration: 100,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setDrawerVisible(false);
            onClose();
        });
    }, [onClose]);

    if (!isDrawerVisible) return null;

    const totalPrice = Math.ceil(duration / 60) * table.priceOfMunite;

    return (
        <View style={styles.modalOverlay}>
            <Animated.View
                style={[
                    styles.drawerContainer,
                    { width: drawerWidth, transform: [{ translateX: slideAnim }] },
                ]}
            >
                <SafeAreaView>
                    <View
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: '#ccc'
                        }}
                    >
                        <Avatar.Image
                            style={{
                                backgroundColor: 'trans'
                            }}
                            size={130} source={require('@/assets/logo1.png')} />
                    </View>
                    <View>
                        <Surface style={styles.card} elevation={4}>
                            <View style={styles.header}>
                                <Text style={styles.tableName}>{table.nameTable}</Text>
                                {table.isBooking && <MaterialIcons name="event-seat" size={20} color="#e91e63" />}
                                {table.isActive && <MaterialIcons name="play-circle-filled" size={20} color="#4caf50" />}
                                {table.hasHourlyRate && <MaterialIcons name="schedule" size={20} color="#ff9800" />}
                            </View>

                            <Text style={styles.areaName}>Khu vực: {table.areaName}</Text>

                            {table.timeStart && (
                                <View style={styles.timeContainer}>
                                    <Text style={styles.label}>Bắt đầu:</Text>
                                    <Text style={styles.value}>
                                        {format(new Date(table.timeStart), 'HH:mm:ss dd/MM/yyyy')}
                                    </Text>
                                </View>
                            )}

                            {table.isActive && (
                                <>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.label}>Thời gian sử dụng:</Text>
                                        <Text style={styles.duration}>{formatDuration(duration)}</Text>
                                    </View>

                                    {table.hasHourlyRate && (
                                        <View style={styles.timeContainer}>
                                            <Text style={styles.label}>Tạm tính:</Text>
                                            <Text style={styles.price}>{totalPrice.toLocaleString()} đ</Text>
                                        </View>
                                    )}
                                </>
                            )}
                        </Surface>
                    </View>
                </SafeAreaView>
            </Animated.View>

            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default React.memo(TotalTableInfoSlice); // tránh re-render nếu prop không đổi

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        zIndex: 10,

    },
    drawerContainer: {
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 2,
    },
    drawerSurface: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 12,
        // backgroundColor: '#c61d1d',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0 , 0 , 0.2)',
    },
    card: {
        borderRadius: 12,
        padding: 16,
        margin: 10,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    tableName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    areaName: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    timeContainer: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 4,
    },
    value: {
        color: '#444',
    },
    duration: {
        fontSize: 16,
        color: '#3f51b5',
    },
    price: {
        fontSize: 16,
        color: '#e91e63',
        fontWeight: 'bold',
    },
});
