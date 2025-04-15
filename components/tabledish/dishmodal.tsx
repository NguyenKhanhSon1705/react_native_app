import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ScrollView,
} from 'react-native';
import { Button, Surface, Drawer } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';
import { useTableAreaWebsocket } from '@/websocket/wstablearea';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.8;

type Props = {
    visible: boolean;
    onClose: () => void;
    onSelectArea?: (areaId: number, areaName: string) => void;
};

const DishModal = ({ visible, onClose, onSelectArea }: Props) => {
    const slideAnim = useRef(new Animated.Value(modalHeight)).current;
    const dispatch = useDispatch<AppDispatch>();
    const [activeArea, setActiveArea] = useState<{ areaId?: number; areaName?: string }>({});
    useTableAreaWebsocket(activeArea.areaId);

    const areaList = useSelector(
        (state: RootState) => state.areaStore.areas,
        shallowEqual
    );

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        dispatch(areaAction.getAreaData());
    }, [dispatch]);

    useEffect(() => {
        if (areaList.length > 0) {
            if (onSelectArea) {
                onSelectArea(areaList[0].id, areaList[0].areaName);
                setActiveArea({ areaId: areaList[0].id, areaName: areaList[0].areaName });
            }
        }
    }, [areaList]);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: modalHeight,
                duration: 300,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => {
                setIsVisible(false);
                onClose();
            });
        }
    }, [visible]);

    const handleBackdropPress = useCallback(() => {
        Animated.timing(slideAnim, {
            toValue: modalHeight,
            duration: 300,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false);
            onClose();
        });
    }, [onClose]);

    const handleSelectArea = useCallback(
        (areaId: number, areaName: string) => {
            if (onSelectArea) onSelectArea(areaId, areaName);
            setActiveArea({ areaId, areaName });
            handleBackdropPress(); // đóng modal
        },
        [onSelectArea, handleBackdropPress]
    );

    if (!isVisible) return null;

    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <Animated.View
                style={[
                    styles.modalContainer,
                    { height: modalHeight, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <Surface style={styles.modalContent}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        <Drawer.Section title="Danh sách khu vực" showDivider={false}>
                            {areaList.map((area) => (
                                <Button
                                    key={area.id}
                                    mode="outlined"
                                    style={styles.areaButton}
                                    textColor="#ff8c47"
                                    onPress={() => handleSelectArea(area.id, area.areaName)}
                                >
                                    {area.areaName}
                                </Button>
                            ))}
                        </Drawer.Section>
                    </ScrollView>
                </Surface>
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: 'hidden',
        zIndex: 2,
    },
    modalContent: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    areaButton: {
        borderRadius: 5,
        marginVertical: 4,
        borderColor: '#ff8c47',
        marginHorizontal: 20,
    },
});

export default React.memo(DishModal);
