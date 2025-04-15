import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Animated,
    Easing,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native';
import { Button, Surface, Drawer, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import areaAction from '@/stores/areaStore/areaThunk';
import { useTableAreaWebsocket } from '@/websocket/wstablearea';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.78;

type Props = {
    visible: boolean;
    onClose: () => void;
    onItemPress?: (item: HorizontalItemProps) => void;
    onSelectArea?: (areaId: number, areaName: string) => void;
};
type HorizontalItemProps = {
    title: string;
    imageUrl: string;
  };
const HorizontalItem = ({ title, imageUrl }: HorizontalItemProps) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
const DishModal = ({ visible, onClose, onSelectArea , onItemPress }: Props) => {
    const slideAnim = useRef(new Animated.Value(modalHeight)).current;
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = React.useState('');

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
            }
        }
    }, [areaList]);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
            Animated.timing(slideAnim, {
                toValue: 40,
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
                        <View>
                            <Searchbar
                                placeholder="Search dish"
                                onChangeText={setSearchQuery}
                                value={searchQuery}
                                style={{
                                    borderRadius: 10,
                                    // backgroundColor: '#ccc'
                                }}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={
                                    [
                                        { title: 'Món 1', imageUrl: 'https://source.unsplash.com/40x40/?food' },
                                        { title: 'Món 2', imageUrl: 'https://source.unsplash.com/40x40/?burger' },
                                        { title: 'Món 3', imageUrl: 'https://source.unsplash.com/40x40/?pizza' },
                                        { title: 'Món 4', imageUrl: 'https://source.unsplash.com/40x40/?drink' },
                                      ]
                                }
                                keyExtractor={(item, index) => `item-${index}`}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingHorizontal: 10 }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() => onItemPress && onItemPress(item)}
                                    >
                                        <HorizontalItem {...item} />
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
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


    //
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 12,
        elevation: 3,
        padding: 10,
        width: 160,
        alignItems: 'center',
      },
      itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: '#ccc',
      },
      title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        flexShrink: 1,
      },
});

export default React.memo(DishModal);
