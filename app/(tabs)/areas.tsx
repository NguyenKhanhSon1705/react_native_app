import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores";
import areaAction from "@/stores/areaStore/areaThunk";
import AreaOptionsModal from "../../components/areas/components/areaOptionModal";
import AreaModal from "../../components/areas/components/editAreaModal";
import {
  addAreaData,
  editAreaData,
  AreaData,
} from "@/interfaces/area/AreaTypes";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const AreaScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedArea, setSelectedArea] = useState<AreaData | null>(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const areaList = useSelector((state: RootState) => state.areaStore.areas);

  useEffect(() => {
    dispatch(areaAction.getAreaData());
  }, [dispatch]);

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
          { text: "Hủy", style: "cancel" },
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
      dispatch(
        areaAction.updateArea({ id: areaId, areaName } as editAreaData)
      );
    } else {
      dispatch(areaAction.addArea({ areaName } as addAreaData));
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

      <ScrollView
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {areaList.map((area: AreaData) => (
          <View key={area.id} style={styles.areaCard}>
            <Image
              source={require("@/assets/house.png")}
              style={styles.areaImage}
            />
            <View style={styles.areaDetails}>
              <Text style={styles.areaName}>{area.areaName}</Text>
              <TouchableOpacity
                style={styles.optionsButton}
                onPress={(event) => openOptionsModal(area, event)}
              >
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
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
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
    fontWeight: "600",
    
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  areaCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#ff8c47",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  areaImage: {
    width: "100%",
    height: 130,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: "cover",
  },
  areaDetails: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  areaName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff8c47",
    flexShrink: 1,
  },
  optionsButton: {
    padding: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  optionsButtonText: {
    fontSize: 18,
    color: "#ff8c47",
  },
});

export default AreaScreen;
