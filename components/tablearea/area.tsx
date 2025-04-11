import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
} from 'react-native';
import { Drawer, Surface } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';

const screenWidth = Dimensions.get('window').width;
const drawerWidth = screenWidth * 0.7;

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelectArea?: (areaId: number, areaName: string) => void;
};

const Area = ({ visible, onClose, onSelectArea }: Props) => {
    const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;
    const dispatch = useDispatch<AppDispatch>();
    const hasAutoSelected = useRef(false); // Đánh dấu đã auto chọn chưa

    const areaList = useSelector(
        (state: RootState) => state.areaStore.areas,
        shallowEqual
    );

    const [isDrawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        dispatch(areaAction.getAreaData());
    }, [dispatch]);

    // Auto chọn phần tử đầu tiên
    useEffect(() => {
        // if (visible && areaList.length > 0 && !hasAutoSelected.current) {
        //     const firstArea = areaList[0];
        //     if (onSelectArea) {
        //         onSelectArea(firstArea.id, firstArea.areaName);
        //         hasAutoSelected.current = true;
        //     }
        // }

        if (!visible) {
            hasAutoSelected.current = false; // reset lại khi đóng
        }
    }, [visible]);

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
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setDrawerVisible(false);
                onClose();
            });
        }
    }, [visible]);

    const handleSelectArea = useCallback(
        (areaId: number, areaName: string) => {
            if (onSelectArea) onSelectArea(areaId, areaName);
            Animated.timing(slideAnim, {
                toValue: -drawerWidth,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setDrawerVisible(false);
                onClose();
            });
        },
        [onSelectArea, onClose]
    );

    const handleBackdropPress = useCallback(() => {
        Animated.timing(slideAnim, {
            toValue: -drawerWidth,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setDrawerVisible(false);
            onClose();
        });
    }, [onClose]);

    if (!isDrawerVisible) return null;

    return (
        <View style={styles.modalOverlay}>
            <Animated.View
                style={[
                    styles.drawerContainer,
                    { width: drawerWidth, transform: [{ translateX: slideAnim }] },
                ]}
            >
                <Surface style={styles.drawerSurface}>
                    <Drawer.Section title="Danh sách khu vực" showDivider={false}>
                        {areaList.map((area) => (
                            <Drawer.Item
                                key={area.id}
                                label={area.areaName}
                                onPress={() => handleSelectArea(area.id, area.areaName)}
                            />
                        ))}
                    </Drawer.Section>
                </Surface>
            </Animated.View>

            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>
        </View>
    );
};

export default React.memo(Area); // tránh re-render nếu prop không đổi

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        zIndex: 999,
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
        backgroundColor: '#fff',
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
});
