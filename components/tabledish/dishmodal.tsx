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
import { set } from 'date-fns';

const screenHeight = Dimensions.get('window').height;
const modalHeight = screenHeight * 0.78;

type Props = {
    visible: boolean;
    onClose: () => void;
    onItemPress?: (item : any) => void;
};

/*
    description: component render item in FlatList
    @param name: string 
    @param image: string
*/
const HorizontalItem = ({ name, image }: IMenuGroupInfo) => (
    <View style={styles.itemContainer}>
        <Image
            source={
                image
                    ? { uri: image }
                    : require('@/assets/avatar-default.png')
            }
            style={styles.image}
        />
        <Text style={styles.title}>{name}</Text>
    </View>
);

const DishModal = ({ visible, onClose, onItemPress }: Props) => {
    const slideAnim = useRef(new Animated.Value(modalHeight)).current;
    const dispatch = useDispatch<AppDispatch>();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [paramDish, setParamDish] = useState<IDishDTO>({
        pageIndex: 1,
        pageSize: 6,
        search: '',
        menuGroupId: null
    });
    const debouseParamDish = useDebounce(paramDish, 500)
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const [pageIndexCurrent, setPageIndexCurrent] = useState(2);

    const { loading, dish, menuGroup, error } = useSelector(
        (state: RootState) => state.dishStore as any,
        shallowEqual
    );

    useEffect(() => {
        dispatch(dishAction.getMenuGroupInfo());
    }, [dispatch]);

    useEffect(() => {
        dispatch(dishAction.getDishInfo(debouseParamDish));
        setPageIndexCurrent(2);
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

    /*
    description: handle event when user click toggle modal choose dish
    */
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

    /*
   description: get data when user click item in menuGroup
   @param id: number | id item menuGroup
   @param index: number | index item menuGroup 
   */
    const handleItemPress = (id: number, index: number) => {
        setSelectedItemId((prevSelectedId) =>
            prevSelectedId === id ? null : id
        );
        setParamDish(prev => ({ ...prev, pageIndex: 1 }))

        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5,
            });
        }
    };
    if (!isVisible) return null;

    /*
    description: listen event scroll end in component DishViewList
    @param isScrollEnd: boolean
    */
    const handleScroll = (isScrollEnd: boolean) => {
        if (isScrollEnd) {
            if (pageIndexCurrent <= dish?.totalPages) {
                setPageIndexCurrent((prev) => {
                    return prev + 1;
                });
                dispatch(dishAction.getDishInfoPaging({ ...paramDish, pageIndex: pageIndexCurrent }))
            }
        }
    }

    /*
    description: get data when user click button submit
    @param selectedItems: IDish[]
    */
    const handleSubmit = (selectedItems: any) => {
        onItemPress && onItemPress(selectedItems);
        onClose();

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
                            marginTop: 10
                        }}
                    >
                        <FlatList
                            ref={flatListRef}
                            data={menuGroup}
                            keyExtractor={(item) => `item-${item.id}`}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 10 }}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.card,
                                        selectedItemId === item.id && styles.selectedCard,
                                    ]}
                                    onPress={() => handleItemPress(item.id, index)}
                                >
                                    <HorizontalItem {...item} />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <DishViewList
                            onIsScrollEnd={isscroll => handleScroll(isscroll)}
                            data={dish as any} onSubmit={handleSubmit}
                        />
                    </View>
                </Surface>
            </Animated.View>
        </View>
    );
}; const styles = StyleSheet.create({
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
        backgroundColor: '#eae8e8',
        borderRadius: 12,
        marginRight: 12,
        elevation: 3,
        padding: 8,
        width: 160,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderWidth: 2,
        borderColor: '#d3d1d1',
    },
    selectedCard: {
        borderWidth: 2,
        borderColor: '#ff8c47',
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',


    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
        flexShrink: 1,
    },
});

export default React.memo(DishModal);
