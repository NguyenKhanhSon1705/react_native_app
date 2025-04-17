import { IDish } from '@/interfaces/tabledish/tabledishType';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button,
    StyleSheet,
} from 'react-native';

interface Props {
    data: any;
    onSubmit: (selectedItems: IDish[]) => void;
}

const DishViewList: React.FC<Props> = ({ data, onSubmit }) => {
    const [selectedItems, setSelectedItems] = useState<IDish[]>([]);

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

    const handleScroll = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20; // Khoảng cách gần cuối danh sách
        if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        ) {
            console.log('Gần đến cuối danh sáskskch!55');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
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
                                            : require('@/assets/logo1.png') // Hình ảnh mặc định
                                    }
                                    style={styles.image}
                                />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.dishName}>{item.dish_Name}</Text>
                                    <Text style={styles.unitName}>{item.unit_Name}</Text>
                                    <Text style={styles.price}>{item.selling_Price} đ</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ flex: 1 }} // Đảm bảo FlatList chiếm toàn bộ không gian
                />
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Đảm bảo container chiếm toàn bộ không gian
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#ccc',
        borderRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedItem: {
        backgroundColor: '#ff8c47',
        borderWidth: 2,
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
        color: '#fff',
    },
    unitName: {
        fontSize: 14,
        color: '#666',
    },
    price: {
        fontSize: 14,
        color: '#ff8c47',
    },
});

export default DishViewList;