import Images from '@/assets';
import { IDish } from '@/interfaces/tabledish/tabledishType';
import formatCurrency from '@/utils/functions/formatCurrency';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
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
    data: any;
    handleScroll: (event: any) => any;
    onSubmit: (selectedItems: IDish[]) => void;
}

const DishViewList: React.FC<Props> = ({ data, onSubmit, handleScroll}) => {
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


    return (
        <View style={styles.container}>
            {
                data.length == 0 ?
                    <Text
                        style={{
                            fontStyle: 'normal',
                            fontWeight: '600',
                            textAlign: 'center',
                            margin: 20
                        }}
                    >Không có dữ liệu...</Text> :
                    <FlatList
                        style={{
                            height: 400,
                            padding: 4
                        }}
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
                                                : Images.imgDefault // Hình ảnh mặc định
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
                        onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
            }
            <Button
                style={{
                    backgroundColor: "#ff8c47",
                    padding: 4,
                    marginTop: 8,
                }}
                textColor='#fff'
                onPress={handleSubmit} >Thêm món</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2, // Shadow for Android
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: '#fff',
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow for iOS
        shadowOpacity: 0.2, // Shadow for iOS
        shadowRadius: 4, // Shadow for iOS
    },
    selectedItem: {
        backgroundColor: '#ff8c47',
        elevation: 5, // Stronger shadow for Android
        shadowColor: '#ff8c47', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Stronger shadow for iOS
        shadowOpacity: 0.4, // Stronger shadow for iOS
        shadowRadius: 6, // Stronger shadow for iOS
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
        color: '#450dee',
        fontStyle: 'italic'
    },
    unitName: {
        fontSize: 14,
        color: '#2810fa',
    },
    price: {
        fontSize: 16,
        color: 'red',
    },
});

export default DishViewList;