import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/stores";

import { IMenuGroup, IMenuGroupData, IMenuGroupDTO } from "@/interfaces/menuGroup/MenuGroupTypes";
import menuGroupAction from "@/stores/menuGroupStore/menuGroupThunk";
import MenuGroupModal from "../../components/menuGroups/components/editMenuGroupModal";
import MenuGroupOptionsModal from "../../components/menuGroups/components/menuGroupOptionModal";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const MenuGroupScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMenuGroup, setSelectedMenuGroup] = useState<IMenuGroup | null>(null);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [isMenuGroupModalVisible, setIsMenuGroupModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [highlightedMenuGroupId, setHighlightedMenuGroupId] = useState<number | null>(null);

  // Pagination and Search State
  const [shopId, setShopId] = useState(0); // Assuming a default shopId, replace with actual logic if needed
  const [pageIndex, setPageIndex] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const menuGroupData = useSelector((state: RootState) => state.menuGroupStore.menuGroupData);
  const menuGroupList = menuGroupData?.items || [];
  const { loading, error } = useSelector((state: RootState) => state.menuGroupStore);

  useEffect(() => {
    // Fetch menu groups with pagination and search parameters
    const params: IMenuGroupDTO = { shopId, pageIndex, limit, search };
    dispatch(menuGroupAction.getMenuGroupData(params));
  }, [dispatch, shopId, pageIndex, limit, search]); // Depend on pagination and search state

  useEffect(() => {
    if (highlightedMenuGroupId !== null) {
      const timeout = setTimeout(() => setHighlightedMenuGroupId(null), 3000); // 3s
      return () => clearTimeout(timeout);
    }
  }, [highlightedMenuGroupId]);

  const openOptionsModal = (menuGroup: IMenuGroup, event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setSelectedMenuGroup(menuGroup);
    setModalPosition({ top: pageY, left: pageX });
    setIsOptionsModalVisible(true);
  };

  const closeOptionsModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleEdit = () => {
    if (selectedMenuGroup) {
      closeOptionsModal();
      setIsMenuGroupModalVisible(true);
    }
  };

  const handleDelete = () => {
    if (selectedMenuGroup) {
      Alert.alert(
        "Xóa nhóm món",
        `Bạn có chắc chắn muốn xóa ${selectedMenuGroup.name}?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xóa",
            onPress: () => {
              dispatch(menuGroupAction.deleteMenuGroup(selectedMenuGroup.id));
            },
            style: "destructive",
          },
        ]
      );
    }
    closeOptionsModal();
  };

  const handleSaveMenuGroup = (formData: FormData) => {
    if (selectedMenuGroup) {
      dispatch(menuGroupAction.updateMenuGroup(formData));
    } else {
      dispatch(menuGroupAction.addMenuGroup(formData));
    }
    closeMenuGroupModal();
  };

  const handleAddNew = () => {
    setSelectedMenuGroup(null);
    setIsMenuGroupModalVisible(true);
  };

  const closeMenuGroupModal = () => {
    setIsMenuGroupModalVisible(false);
  };

  // Pagination Handlers
  const handleNextPage = () => {
    setPageIndex(pageIndex + 1);
  };

  const handlePreviousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Danh sách thực đơn</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
          <Text style={styles.addButtonText}>Thêm mới</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          value={search}
          onChangeText={setSearch}
        />
      </View>


      {loading && <Text>Loading...</Text>}

      <ScrollView contentContainerStyle={styles.gridContainer}>
        {menuGroupList.map((menuGroup: IMenuGroup) => (
          <View key={menuGroup.id} style={styles.areaCard}>
            {menuGroup.image ? (
              <Image 
                source={{ uri: menuGroup.image }} 
                style={styles.areaImage}
                resizeMode="cover"
              />
            ) : (
              <FontAwesome5
                name="utensils"
                size={50}
                color="#ff8c47"
                style={styles.areaImage}
              />
            )}
            <View style={styles.areaDetails}>
              <View style={styles.areaTextContainer}>
                <Text numberOfLines={1} ellipsizeMode="tail">
                  <Text style={[styles.areaName, { color: "#ff8c47" }]}>{menuGroup.name}</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.optionsButton}
                onPress={(event) => openOptionsModal(menuGroup, event)}
              >
                <Text style={styles.optionsButtonText}>•••</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePreviousPage} disabled={pageIndex === 1}>
          <Text style={styles.paginationText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.paginationText}>Page {pageIndex}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Text style={styles.paginationText}>Next</Text>
        </TouchableOpacity>
      </View>

      <MenuGroupOptionsModal
        visible={isOptionsModalVisible}
        onClose={closeOptionsModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        position={modalPosition}
      />

      <MenuGroupModal
        visible={isMenuGroupModalVisible}
        onClose={closeMenuGroupModal}
        onSave={handleSaveMenuGroup}
        menuGroup={selectedMenuGroup}
      />
    </SafeAreaView>
  );
};

export default MenuGroupScreen;

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
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
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
    overflow: 'hidden',
  },
  areaImage: {
    width: '100%',
    height: 150,
    alignSelf: "center",
    marginTop: 0,
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
  description: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
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
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
  },
  paginationText: {
    fontSize: 16,
    color: "#ff8c47",
  },
}); 