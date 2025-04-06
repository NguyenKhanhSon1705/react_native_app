import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores";



import { ITableData , ITableRequest} from "@/interfaces/table.ts/TableTypes";
import tableAction from "@/stores/tableStore/tableThunk";
import TableModal from "./components/editTableModal";
import TableOptionsModal from "./components/tableOptionModal";


const TableScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedTable, setSelectedTable] = useState<ITableData | null>(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(tableAction.getTableData(5));
  }, [dispatch]);

  const tableList = useSelector((state: RootState) => state.tableStore.tables);

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
      console.log("Editing area:", selectedTable);
      closeOptionsModal();
      setTimeout(() => {
        setIsTableModalVisible(true);
      }, 100);
    }
  };

  const handleDelete = () => {
    if (selectedTable) {
      Alert.alert(
        "Xóa khu vực",
        `Bạn có chắc chắn muốn xóa ${selectedTable.nameTable}?`,
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: async () => {
              dispatch(tableAction.deleteTable(selectedTable.id));
            },
            style: "destructive",
          },
        ]
      );
    }
    closeOptionsModal();
  };

  const handleSaveTable = (tableId: number,areaId:number,nameTable: string) => {
    if (tableId) {
      dispatch(
        tableAction.updateTable({ id: tableId,areaId,nameTable } as ITableRequest)
      );
    } else {
      dispatch(
        tableAction.addTable({areaId,nameTable } as ITableRequest)
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
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Danh sách bàn</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <Text style={styles.addButtonText}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      {/* Grid hiển thị bàn */}
      <ScrollView
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {tableList.map((table: ITableData) => (
          <View key={table.id} style={styles.areaCard}>
            <Image
              source={require("@/assets/table.png")}
              style={styles.areaImage}
            />
          <View style={styles.areaDetails}>
            <View style={styles.areaTextContainer}>
              <Text style={styles.areaName}>{table.areaName}</Text>
              <Text style={[styles.areaName, { color: "#999" }]}>{table.nameTable}</Text>
            </View>
            <TouchableOpacity style={styles.optionsButton} onPress={(event) => openOptionsModal(table, event)}>
              <Text style={styles.optionsButtonText}>•••</Text>
            </TouchableOpacity>
          </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal tuỳ chọn */}
      <TableOptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        position={modalPosition}
      />

      {/* Modal thêm/sửa bàn */}
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
    backgroundColor: "#F5F5F5",
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
  },
  addButton: {
    backgroundColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  areaCard: {
    width: "31%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  areaImage: {
    width: "100%",
    height: 90,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
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
    color: "#666",
  },
  areaTextContainer: {
    flexDirection: "column",
  },
});
