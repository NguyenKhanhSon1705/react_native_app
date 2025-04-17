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
import { Surface, Searchbar } from 'react-native-paper';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { AppDispatch, RootState } from '@/stores';
import { IDishDTO, IMenuGroupInfo } from '@/interfaces/dish/dishType';
import dishAction from '@/stores/dishStore/dishThunk';
import useDebounce from '@/utils/hooks/useDebouse';
import LoadingOverlay from '../loadingrotate';
import DishViewList from './dishViewList';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.78;

type Props = {
    visible: boolean;
    onClose: () => void;
    onItemPress?: (item: IMenuGroupInfo) => void;
    onSelectArea?: (areaId: number, areaName: string) => void;
};

const HorizontalItem = ({ name, image }: IMenuGroupInfo) => (
    <View style={styles.itemContainer}>
        <Image
            source={
                image
                    ? { uri: image }
                    : require('@/assets/logo1.png') // Hình ảnh mặc định
            }
            style={styles.image}
        />
        <Text style={styles.title}>{name}</Text>
    </View>
);

const DishModal = ({ visible, onClose, onSelectArea, onItemPress }: Props) => {
    const slideAnim = useRef(new Animated.Value(modalHeight)).current;
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [paramDish, setParamDish] = useState<IDishDTO>({
        pageIndex: 1,
        pageSize: 10,
        search: '',
        menuGroupId: null
    });
    const debouseParamDish = useDebounce(paramDish, 700)
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null); // State để lưu item được chọn
    const flatListRef = useRef<FlatList>(null); // Tham chiếu đến FlatList

    const { loading, dish, menuGroup, error } = useSelector(
        (state: RootState) => state.dishStore,
        shallowEqual
    );
    console.log(dish?.items)
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        dispatch(dishAction.getMenuGroupInfo());
    }, [dispatch])
    useEffect(() => {
        dispatch(dishAction.getDishInfo(debouseParamDish));
    }, [dispatch, debouseParamDish]);

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

    useEffect(() => {
        setParamDish(prev => ({ ...prev, menuGroupId: selectedItemId }))
    }, [selectedItemId])
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

    const handleItemPress = (id: number, index: number) => {
        setSelectedItemId((prevSelectedId) =>
            prevSelectedId === id ? null : id
        );

        // Tự động scroll đến item được chọn
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5, // Đưa item ra giữa màn hình
            });
        }
    };
    console.log(loading)
    if (!isVisible) return null;


    const handleSubmit = (selectedItems: any) => {
        console.log('Selected Items', JSON.stringify(selectedItems, null, 2));
    };

    return (
        <View style={styles.overlay}>
            {loading && <LoadingOverlay />}
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
                    <View>
                        <Searchbar
                            placeholder="Tìm kiếm món ăn"
                            onChangeText={(value) => {
                                setParamDish(prev => ({ ...prev, search: value }))
                                setSearchQuery(value)
                            }}
                            value={searchQuery}
                            style={{
                                borderRadius: 12,
                                backgroundColor: 'trans',
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}
                        />
                    </View>
                    <View
                        style={{
                            paddingBottom: 10,
                            marginTop: 10
                        }}
                    >
                        <FlatList
                            ref={flatListRef} // Tham chiếu đến FlatList
                            data={menuGroup}
                            keyExtractor={(item) => `item-${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.card,
                                        selectedItemId === item.id && styles.selectedCard, // Thêm border nếu được chọn
                                    ]}
                                    onPress={() => handleItemPress(item.id, index)} // Truyền index để scroll
                                >
                                    <HorizontalItem {...item} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{
                        height:'100%',
                    }}>
                        <DishViewList
                            data={dish?.items || []} onSubmit={handleSubmit}
                        />
                    </View>
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
    card: {
        backgroundColor: '#ccc',
        borderRadius: 12,
        marginRight: 12,
        elevation: 3,
        padding: 8,
        width: 160,
        alignItems: 'center'
    },
    selectedCard: {
        backgroundColor: '#ff8c47',
        color: '#fff'
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        color: '#fff'
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
        color: '#fff',
        flexShrink: 1,
    },
});

export default React.memo(DishModal);
