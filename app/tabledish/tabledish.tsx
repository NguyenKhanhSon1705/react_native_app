import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import styled from "styled-components/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button, IconButton } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import tabledishAction from "@/stores/tabledishStore/tabledishThunk";
import { useLocalSearchParams } from "expo-router";
import { IDish } from "@/interfaces/tabledish/tabledishType";
import BackButton from "@/components/BackButton ";
import formatCurrency from "@/utils/functions/formatCurrency";
import formatDatetime from "@/utils/functions/formatDatetime";
import { MaterialIcons } from "@expo/vector-icons";
import Dishmodal from "@/components/tabledish/dishmodal";
import LoadingOverlay from "@/components/loadingrotate";
import TotalTableInfoSlice from "@/components/tabledish/totalTableInfoSlice";

const Container = styled(View)`
  flex: 1;
  background-color: #f2f2f2;
  padding-top: 50px;
`;
const FoodCard = styled(Animatable.View)`
  background-color: #fff;
  flex-direction: row;
  padding: 14px;
  margin: 8px 16px;
  border-radius: 16px;
  
`;

const FoodImage = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  padding: 2px  ;
`;

const Info = styled(View)`
  flex: 1;
  margin-left: 12px;
`;

const FoodName = styled(Text)`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const PriceRating = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
`;

const Rating = styled(Text)`
  font-size: 13px;
  color: #ff9800;
`;

const Price = styled(Text)`
  font-size: 14px;
  font-weight: bold;
  color: #f00909;
`;

const HiddenRow = styled(View)`
  align-items: flex-end;
  justify-content: center;
  flex: 1;
  margin-right: 24px;
`;
const ButtonCustom = styled(Button)`
    border-radius: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
`

export default function FoodListScreen() {

    const dispatch = useDispatch<AppDispatch>();
    const [isBtnUpdate, setIsBtnUpdate] = useState<boolean>(false);
    const [foods, setFoods] = useState<IDish[] | undefined>();
    const [modalDishVisible, setModalDishVisible] = useState(false);
    const [modalTotalTableInfoSlice, setModalTotalTableInfoSlice] = useState(false);
    const { tableName, tableId } = useLocalSearchParams();
    const { loading, tabledish, error } = useSelector(
        (state: RootState) => state.tableDishStore,
        shallowEqual
    );
    useEffect(() => {
        dispatch(tabledishAction.getTableDishData(Number(tableId)));
    }, [tableId]);

    useEffect(() => {
        setFoods(tabledish?.dish);
        if (tabledish.isActive) {
            setIsBtnUpdate(true);
        }
    }, [tabledish]);

    const handleDelete = (rowKey: string) => {
        Alert.alert("Xóa món ăn", "Bạn có chắc chắn muốn xóa món ăn này?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Xóa",
                    onPress: () => {
                        setFoods((prev: IDish[] | undefined) => prev ? prev.filter((item) => item.id !== Number(rowKey)) : []);
                    },
                },
            ],
            { cancelable: false }

        )
    };

    const handleQuantityChange = (id: number, newQuantity: number) => {
        setFoods((prevFoods) =>
            prevFoods?.map((food) =>
                food.id === id ? { ...food, quantity: newQuantity } : food
            )
        );
    };
    const handleAdddish = () => {
        setModalDishVisible(true)
    }

    const handleUpdate = () => {

    }
    const handleCreate = () => {

    }
    const handleChangeTable = () => {

    }
    const handleAbortTable = () => {

    }
    const handlePayment = () => {

    };
    return (
        <Container>
            {loading && <LoadingOverlay message="Đang tải..." />}
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        marginLeft: 12
                    }}
                ><BackButton />
                </View>
                <Text style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    flex: 1,
                }}>
                    {tableName} <Text style={{ color: "#ccc" }}>- {tabledish.areaName}</Text>
                </Text>
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
                        onPress={() => setModalTotalTableInfoSlice(true)}
                    >
                        <MaterialIcons name="menu" size={20} color="#2c2c2c" />
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                }}
            >
                <ButtonCustom
                    mode="contained"
                    icon={"plus"}
                    style={{
                        backgroundColor: "#07b80d",
                    }}
                    textColor="#fff"
                    contentStyle={{ justifyContent: 'flex-start' }}
                    onPress={handleAdddish}
                >Thêm</ButtonCustom>
            </View>
            <SwipeListView
                data={foods}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <FoodCard animation="fadeInUp" duration={400}>
                        <FoodImage source={{ uri: item.image }} />
                        <Info>
                            <FoodName>{item.dish_Name}</FoodName>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    alignSelf: "flex-end",
                                }}
                            >
                                <IconButton
                                    icon="minus"
                                    size={20}
                                    onPress={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
                                />
                                <TextInput
                                    value={item.quantity.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(value) => handleQuantityChange(item.id, Math.max(Number(value), 1))}
                                    style={{
                                        width: 50,
                                        height: 40,
                                        textAlign: "center",
                                        borderWidth: 1,
                                        borderColor: "#ccc",
                                        borderRadius: 4,
                                    }}
                                />
                                <IconButton
                                    icon="plus"
                                    size={20}
                                    onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                                />
                            </View>
                            <PriceRating>
                                <Rating>⭐ 4.9 (10 Review)</Rating>
                                <Price>{formatCurrency.formatCurrencyVN(item.selling_Price)} đ</Price>
                            </PriceRating>
                            {/* Thêm chức năng tăng/giảm số lượng */}
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}>
                            </View>
                        </Info>
                    </FoodCard>
                )}
                renderHiddenItem={({ item }) => (
                    <HiddenRow>
                        <Animatable.View animation="bounceIn" duration={500}>
                            <IconButton
                                icon="delete"
                                iconColor="white"
                                containerColor="#ff3b30"
                                onPress={() => handleDelete(item.id.toString())}
                            />
                        </Animatable.View>
                    </HiddenRow>
                )}
                rightOpenValue={-80}
                disableRightSwipe
                previewRowKey={"1"}
                previewOpenValue={-40}
                previewOpenDelay={300}
            />
            <TotalTableInfoSlice
                table={tabledish}
                visible={modalTotalTableInfoSlice}
                onClose={() => setModalTotalTableInfoSlice(false)}
            />
            <View
                style={{
                    height: 120,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: 6,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingBottom: 10,
                    zIndex: 100
                }}
            >
                <View>
                    <ButtonCustom
                        mode="contained"
                        icon={"plus"}
                        style={{
                            backgroundColor: "#07b80d",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={handleUpdate}
                    >{isBtnUpdate ? "Cập nhật" : "Tạo bàn"}</ButtonCustom>
                    <ButtonCustom
                        icon={"autorenew"}
                        mode="contained"
                        style={{
                            backgroundColor: "#f38910",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={handleChangeTable}
                    >Chuyển bàn</ButtonCustom>

                </View>
                <View>
                    <ButtonCustom
                        mode="contained"
                        icon={"contactless-payment"}
                        style={{
                            backgroundColor: "#3008f8",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={handlePayment}
                    >Thanh toán</ButtonCustom>
                    <ButtonCustom
                        mode="contained"

                        icon={"close"}
                        style={{
                            backgroundColor: "#f80808",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={handleAbortTable}
                    >Hủy bàn</ButtonCustom>

                </View>
            </View>
            <Dishmodal
                visible={modalDishVisible}
                onClose={() => setModalDishVisible(false)}
                onSelectArea={(id, name) => console.log('Selected:', id, name)}
            />

        </Container>
    );
}
