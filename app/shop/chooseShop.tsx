import { FC, useEffect, useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import styled from "styled-components";
import ChooseShopItem from "./components/chooseShopItem";
import { useRouter } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import shopAction from "@/stores/shopStore/shopThunks";
import { AppDispatch, RootState } from "@/stores";
import { IShopData } from "@/interfaces/shop/shopDTO";
import cookiesIdShop from "@/utils/functions/cookieIdShop";
import routes_path from "@/routes/routes_path";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import BackButton from "@/components/BackButton ";
import { MaterialIcons } from "@expo/vector-icons";
import ShopModal from "./components/ShopModal";
import PasswordConfirmModal from "./components/PasswordConfirmModal";
import { createImageFormData } from "@/utils/functions/createImageFormData";
import LoadingOverlay from "@/components/loadingrotate";

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #F5F7FA; 
`;

const ContainerHeader = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: white; 
    padding: 12px 0;
`;

const ChooseShop: FC = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { shops: shopData, loading } = useSelector((state: RootState) => state.shopStore);
    const [modalVisible, setModalVisible] = useState(false);
    const [editShop, setEditShop] = useState<IShopData | undefined>(undefined);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [shopToDelete, setShopToDelete] = useState<IShopData | null>(null);

    useEffect(() => {
        dispatch(shopAction.getListShopUser());
    }, []);

    const handleGotoShop = async (id: any) => {
        await cookiesIdShop.setCookieIdShop(id);
        router.push(routes_path.TABLEAREA);
    };

    const handleSubmit = (data: IShopData) => {
        const formData = createImageFormData(data);
        if (editShop) {
            console.log(formData);
            // Dispatch update action
            dispatch(shopAction.updateShop(formData));
        } else {
            dispatch(shopAction.createShop(formData));
        }
        setModalVisible(false);
        setEditShop(undefined);
    };

    const handleEdit = (shop: IShopData) => {
        setEditShop(shop);
        setModalVisible(true);
    };

    const handleDelete = (shop: IShopData) => {
        setShopToDelete(shop);
        setPasswordModalVisible(true);
    };

    const handleConfirmDelete = async (password: string) => {
        try {
            await dispatch(shopAction.deleteShop({
                id: shopToDelete?.id ?? 0,
                password
            }));
            dispatch(shopAction.getListShopUser());
            setPasswordModalVisible(false);
            setShopToDelete(null);
        } catch (error) {
            console.error('Error deleting shop:', error);
            Alert.alert(
                "Lỗi",
                "Không thể xóa cửa hàng. Vui lòng thử lại sau."
            );
        }
    };

    return (
        <Container>
            {loading && <LoadingOverlay />}
            <ContainerHeader>
                <View style={{ marginLeft: 12 }}>
                    <BackButton />
                </View>
                <View
                    style={{
                        marginRight: 12
                    }}
                >
                    <TouchableOpacity
                        style={{
                            backgroundColor: "#f1f3f6",
                            width: 36,
                            height: 36,
                            borderRadius: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            margin: 10,
                            elevation: 3,
                        }}
                        onPress={() => {
                            setEditShop(undefined);
                            setModalVisible(true);
                        }}
                    >
                        <MaterialIcons name="add" size={20} color="#2c2c2c" />
                    </TouchableOpacity>
                </View>
            </ContainerHeader>
            {
                shopData.map((item: IShopData) => {
                    return (
                        <ChooseShopItem
                            key={item.id}
                            propsItem={item}
                            onPressIdShop={handleGotoShop}
                            onPressEdit={handleEdit}
                            onPressDelete={handleDelete}
                        />
                    );
                })
            }
            <ShopModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditShop(undefined);
                }}
                onSubmit={handleSubmit}
                editData={editShop}
            />
            <PasswordConfirmModal
                visible={passwordModalVisible}
                onClose={() => {
                    setPasswordModalVisible(false);
                    setShopToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                shopName={shopToDelete?.shopName || ''}
            />
        </Container>
    );
};

export default ChooseShop;