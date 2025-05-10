import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores";

import { ITableData , ITableRequest } from "@/interfaces/table.ts/TableTypes";
import tableAction from "@/stores/tableStore/tableThunk";
import TableModal from "../../components/tables/components/editTableModal";
import TableOptionsModal from "../../components/tables/components/tableOptionModal";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const TableScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTable, setSelectedTable] = useState<ITableData | null>(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [highlightedTableId, setHighlightedTableId] = useState<number | null>(null);

  const tableList = useSelector((state: RootState) => state.tableStore.tables as ITableData[]);

  useEffect(() => {
    dispatch(tableAction.getTableData());
  }, [dispatch]);

  useEffect(() => {
    if (highlightedTableId !== null) {
      const timeout = setTimeout(() => setHighlightedTableId(null), 3000); // 3s
      return () => clearTimeout(timeout);
    }
  }, [highlightedTableId]);

  const openOptionsModal = (table: ITableData, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setSelectedTable(table);
    setModalPosition({ top: pageY, left: pageX });
    setIsOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleEdit = () => {
    if (selectedTable) {
      closeOptionsModal();
      setIsTableModalVisible(true);
    }
  };

  const handleDelete = () => {
    if (selectedTable) {
      Alert.alert(
        "Xóa khu vực",
        `Bạn có chắc chắn muốn xóa ${selectedTable.nameTable}?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xóa",
            onPress: () => {
              dispatch(tableAction.deleteTable(selectedTable.id));
            },
            style: "destructive",
          },
        ]
      );
    }
    closeOptionsModal();
  };

  const handleSaveTable = (tableId: number, areaId: number, nameTable: string) => {
    if (tableId) {
      dispatch(
        tableAction.updateTable({ id: tableId, areaId, nameTable } as ITableRequest)
      );
      setHighlightedTableId(tableId);
    } else {
      dispatch(
        tableAction.addTable({ areaId, nameTable } as ITableRequest)
      );
    }
    closeTableModal();
  };

  const handleAddNew = () => {
    setSelectedTable(null);
    setIsTableModalVisible(true);
  };

  const closeTableModal = () => {
    setIsTableModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Danh sách bàn</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <Text style={styles.addButtonText}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {tableList.map((table: ITableData) => (
          <View key={table.id} style={styles.areaCard}>
            <FontAwesome5 
            name="table"
            size={50}
            color= "#ff8c47"
            style={styles.areaImage} />
            <View style={styles.areaDetails}>
              <View style={styles.areaTextContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  <Text style={[styles.areaName, { color: "#999" }]}>{table.areaName} - </Text>
                  <Text style={[styles.areaName, { color: "#ff8c47" }]}>{table.nameTable}</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.optionsButton}
                onPress={(event) => openOptionsModal(table, event)}
              >
                <Text style={styles.optionsButtonText}>•••</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TableOptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        position={modalPosition}
      />

      <TableModal
        visible={isTableModalVisible}
        onClose={closeTableModal}
        onSave={handleSaveTable}
        table={selectedTable}
      />
    </SafeAreaView>
  );
};

export default TableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff8c47",
  },
  addButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ff8c47",
  },
  addButtonText: {
    color: "#ff8c47",
    fontSize: 14,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 50
  },
  areaCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  areaImage: {
    
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 10,
  },
  areaDetails: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  areaName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  optionsButton: {
    padding: 5,
  },
  optionsButtonText: {
    fontSize: 16,
    color: "#ff8c47",
  },
  areaTextContainer: {
    flexDirection: "column",
  },
});
