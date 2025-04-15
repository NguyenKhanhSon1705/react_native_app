import { AppDispatch, RootState } from "@/stores";
import tabledishAction from "@/stores/tabledishStore/tabledishThunk";
import { useLocalSearchParams } from "expo-router";
import React, { FC, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native"
import { Checkbox, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const SearchInput = styled(TextInput)`
  border: 1px solid #ccc;
  padding: 8px 12px;
  border-radius: 12px;
  margin: 10px 16px;
  font-size: 16px;
  background-color: #fff;
`;

const ItemRow = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const ItemText = styled(Text)`
  font-size: 16px;
  color: #333;
`;

interface IItem {
    id: string;
    name: string;
}

const ListDishCheckbox = () => {
    const { tableName, tableId } = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const tabledishdata = useSelector(
        (state: RootState) => state.tableDishStore.tabledish
    );
    useEffect(() => {
        if (!tableId) return;
        dispatch(tabledishAction.getTableDishData(Number(tableId)));
    }, [tableId]);

    const onChangeSelected = (selectedIds: string[]) => {
        // console.log("Đã chọn:", selectedIds);
    };
    const data = [
        { id: "1", name: "Bàn A1" },
        { id: "2", name: "Bàn A2" },
        { id: "3", name: "Khu vực ngoài trời" },
        { id: "4", name: "Phòng VIP" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const filteredData = useMemo(() => {
        return data.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    const toggleSelect = (id: string) => {
        const newSelected = selectedIds.includes(id)
            ? selectedIds.filter((x) => x !== id)
            : [...selectedIds, id];

        setSelectedIds(newSelected);
        onChangeSelected(newSelected);
    };

    const renderItem = ({ item }: { item: IItem }) => (
        <ItemRow>
            <ItemText>{item.name}</ItemText>
            <Checkbox
                status={selectedIds.includes(item.id) ? "checked" : "unchecked"}
                onPress={() => toggleSelect(item.id)}
            />
        </ItemRow>
    );

    return (
        <View>
            <SearchInput
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChangeText={setSearchTerm}
            />

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={
                    <Text style={{ textAlign: "center", marginTop: 20 }}>
                        Không tìm thấy dữ liệu.
                    </Text>
                }
            />
        </View>
    );
}

export default ListDishCheckbox;