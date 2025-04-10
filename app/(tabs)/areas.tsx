import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores";
import areaAction from "@/stores/areaStore/areaThunk";
import AreaOptionsModal from "../../components/areas/components/areaOptionModal";
import AreaModal from "../../components/areas/components/editAreaModal";
import { addAreaData,editAreaData,AreaData } from "@/interfaces/area/AreaTypes";


const AreaScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(areaAction.getAreaData());
  }, [dispatch]);

  const areaList = useSelector((state: RootState) => state.areaStore.areas);

  const openOptionsModal = (area: AreaData, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setSelectedArea(area);
    setModalPosition({ top: pageY, left: pageX });
    setIsOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleEdit = () => {
    if (selectedArea) {
      closeOptionsModal();
      setIsAreaModalVisible(true);
    }
  };

  const handleDelete = () => {
    if (selectedArea) {
      Alert.alert(
        "Xóa khu vực",
        `Bạn có chắc chắn muốn xóa ${selectedArea.areaName}?`,
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: () => {
              dispatch(areaAction.deleteArea(selectedArea.id));
            },
            style: "destructive",
          },
        ]
      );
    }
    closeOptionsModal();
  };

  const handleAddNew = () => {
    setSelectedArea(null);
    setIsAreaModalVisible(true);
  };

  const handleSaveArea = (areaName: string, areaId?: number) => {
    if (areaId) {
       dispatch(areaAction.updateArea(
        { id: areaId, areaName} as editAreaData
       ));
    } else {
       dispatch(areaAction.addArea(
        { areaName } as addAreaData
       ));
    }
    closeAreaModal();
  };

  const closeAreaModal = () => {
    setIsAreaModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Danh sách khu vực</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <Text style={styles.addButtonText}>Thêm mới</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer} showsVerticalScrollIndicator={false}>
        {areaList.map((area: AreaData) => (
          <View key={area.id} style={styles.areaCard}>
            <Image source={require("@/assets/house.png")} style={styles.areaImage} />
            <View style={styles.areaDetails}>
              <Text style={styles.areaName}>{area.areaName}</Text>
              <TouchableOpacity style={styles.optionsButton} onPress={(event) => openOptionsModal(area, event)}>
                <Text style={styles.optionsButtonText}>•••</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <AreaOptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        position={modalPosition}
      />

      <AreaModal
        visible={isAreaModalVisible}
        onClose={closeAreaModal}
        onSave={handleSaveArea}
        area={selectedArea}
      />
    </SafeAreaView>
  );
};

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
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  areaImage: {
    width: "100%",
    height: 150,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsButton: {
    padding: 5,
  },
  optionsButtonText: {
    fontSize: 16,
    color: "#666",
  },
});

export default AreaScreen;