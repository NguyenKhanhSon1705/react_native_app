import { IDishData } from '@/interfaces/dish/dishType';
import { IDish } from '@/interfaces/tabledish/tabledishType';
import formatCurrency from '@/utils/functions/formatCurrency';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    data: IDishData;
    onIsScrollEnd?: (isScrollEnd: boolean) => void;
    onSubmit: (selectedItems: IDish[]) => void;
}

const DishViewList: React.FC<Props> = ({ data, onSubmit, onIsScrollEnd }) => {
    const [selectedItems, setSelectedItems] = useState<IDish[]>([]);

    /*
        description: handle select item in component DishViewList
        @param item IDish
    */
    const handleSelectItem = (item: IDish) => {
        const isSelected = selectedItems.some((selected) => selected.id === item.id);
        if (isSelected) {
            setSelectedItems((prev) => prev.filter((selected) => selected.id !== item.id));
        } else {
            setSelectedItems((prev) => [...prev, item]);
        }
    };

    const handleSubmit = () => {
        onSubmit(selectedItems);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data.items as any}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }: { item: IDish }) => {
                    const isSelected = selectedItems.some((selected) => selected.id === item.id);
                    return (
                        <TouchableOpacity
                            style={[
                                styles.itemContainer,
                                isSelected && styles.selectedItem,
                            ]}
                            onPress={() => handleSelectItem(item)}
                        >
                            <Image
                                source={
                                    item.image
                                        ? { uri: item.image }
                                        : require('@/assets/avatar-default.png')
                                }
                                style={styles.image}
                            />
                            <View style={styles.infoContainer}>
                                <Text style={styles.dishName}>{item.dish_Name}</Text>
                                <Text style={styles.unitName}>{item.unit_Name}</Text>
                                <Text style={styles.price}>{formatCurrency.formatCurrencyVN(item.selling_Price)} đ</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                onEndReached={() => {
                    onIsScrollEnd && onIsScrollEnd(true);
                }}
                onEndReachedThreshold={0.3}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
            <Button textColor='#fff' style={styles.btnSubmit} onPress={handleSubmit} >Thêm món ăn</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ffff',
        borderRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#d3d1d1',
    },
    selectedItem: {
        backgroundColor: '#f4e6dd',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    dishName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    unitName: {
        fontSize: 14,
        color: '#000',
    },
    price: {
        fontSize: 14,
        color: 'red',
    },
    btnSubmit: {
        backgroundColor: '#ff8c47',
        borderRadius: 5,
        paddingVertical: 6,
        marginTop: 10,
        fontWeight: 'bold',

    }
});

export default DishViewList;