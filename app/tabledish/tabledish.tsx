import React, { useEffect, useState } from "react";
import { Text, View, Image, TouchableOpacity, TextInput, Alert, Modal } from "react-native";
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
import { set } from "date-fns";

const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  padding-top: 50px;
`;
const FoodCard = styled.View`
  background-color: #fff;
  flex-direction: row;
  padding: 8px;
  margin: 8px 16px;
  border-radius: 10px;
  border-color: #ccc;
  border-width: 1px;
  
`;

const FoodImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  padding: 2px;
`;

const Info = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const FoodName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #333;
`;

const Tag = styled.Text`
  font-size: 12px;
  background-color: #ffe6e6;
  color: #ff6b6b;
  padding: 3px 8px;
  border-radius: 6px;
  align-self: flex-start;
  margin-top: 4px;
`;

const PriceRating = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
`;

const Rating = styled.Text`
  font-size: 13px;
  color: #ff9800;
`;

const Price = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #f00909;
`;

const HiddenRow = styled.View`
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
const renderButton = (label : any, icon: any, backgroundColor: any, onPress: any , isDisable:boolean) => (
    <ButtonCustom
        mode="contained"
        icon={icon}
        style={{ backgroundColor }}
        textColor="#fff"
        contentStyle={{ justifyContent: 'flex-start' }}
        onPress={onPress}
        disabled={isDisable}
    >
        {label}
    </ButtonCustom>
);


export default function FoodListScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const [isBtnUpdate, setIsBtnUpdate] = useState<boolean>(false);
    const [foods, setFoods] = useState<IDish[] | []>([]);
    const [modalDishVisible, setModalDishVisible] = useState(false);
    const [modalTotalTableInfoSlice, setModalTotalTableInfoSlice] = useState(false);
    const { tableName, tableId } = useLocalSearchParams();
    const [abortModalVisible, setAbortModalVisible] = useState(false);
    const [abortReason, setAbortReason] = useState("");
    const { loading, tabledish } = useSelector(
        (state: RootState) => state.tableDishStore,
        shallowEqual
    );

    useEffect(() => {
        dispatch(tabledishAction.getTableDishData(Number(tableId)));
    }, [tableId]);

    useEffect(() => {
        setFoods(tabledish?.dish || []);
        console.log("tabledish", tabledish);
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
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn thêm bàn này không?",
            [
                {
                    text: "Không",
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: () => {
                        dispatch(
                            tabledishAction.updateTableDish({
                                tableId: Number(tableId),
                                listDishId: foods.map((food) => ({
                                    key: food.id,
                                    selling_Price: food.selling_Price,
                                    quantity: food.quantity,
                                    notes: "food.notes"
                                }))
                            })
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    }
    const handleCreate = () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có muốn thêm bàn này không?",
            [
                {
                    text: "Không",
                    style: "cancel",
                },
                {
                    text: "Có",
                    onPress: () => {
                        setIsBtnUpdate(true);
                        dispatch(
                            tabledishAction.createTableDish({
                                tableId: Number(tableId),
                                listDishId: foods.map((food) => ({
                                    key: food.id,
                                    selling_Price: food.selling_Price,
                                    quantity: food.quantity,
                                    notes: "food.notes"
                                }))
                            })
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    }
    const handleChangeTable = () => {

    }
    const handleAbortTable = () => {
        setAbortModalVisible(true);
    }
    const handlePayment = () => {

    };
    const handleConfirmAbort = () => {
        // Xử lý logic abort ở đây, ví dụ gửi abortReason lên server hoặc Redux
        Alert.alert("Đã hủy bàn", `Lý do: ${abortReason}`);
        setAbortModalVisible(false);
        setAbortReason("");
        setIsBtnUpdate(false);
        setFoods([]);
        dispatch(
            tabledishAction.abortTableDish({
                table_Id: Number(tableId),
                reason_abort: abortReason,
                total_money: foods.reduce((total, food) => total + food.selling_Price * food.quantity, 0),
                total_quantity: foods.reduce((total, food) => total + food.quantity, 0),
            })
        );
    };
    return (
        <Container>
            <Modal
                visible={abortModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setAbortModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        padding: 20,
                        borderRadius: 10,
                        width: "80%"
                    }}>
                        <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>Nhập lý do hủy bàn</Text>
                        <TextInput
                            placeholder="Nhập lý do..."
                            value={abortReason}
                            onChangeText={setAbortReason}
                            style={{
                                borderWidth: 1,
                                borderColor: "#ccc",
                                borderRadius: 6,
                                padding: 8,
                                marginBottom: 16
                            }}
                        />
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            <Button onPress={() => setAbortModalVisible(false)}>Đóng</Button>
                            <Button
                                onPress={handleConfirmAbort}
                                disabled={!abortReason.trim()}
                            >Xác nhận</Button>
                        </View>
                    </View>
                </View>
            </Modal>


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
                keyExtractor={(item) => item.id.toString() ?? item.dish_Name}
                renderItem={({ item }) => (
                    <FoodCard animation="fadeInUp" duration={400}>
                        <FoodImage
                            source={
                                item.image
                                    ? { uri: item.image }
                                    : require('@/assets/avatar-default.png')
                            }
                        />
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
                                    value={item.quantity.toString() ?? ""}
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
                {/* <View>
                    {
                        isBtnUpdate ? <ButtonCustom
                            mode="contained"
                            icon={"plus"}
                            style={{
                                backgroundColor: "#5CB338",
                            }}
                            textColor="#fff"
                            contentStyle={{ justifyContent: 'flex-start' }}
                            onPress={() => handleUpdate()}
                        >Cập nhật</ButtonCustom> :
                            <ButtonCustom
                                mode="contained"
                                icon={"plus"}
                                style={{
                                    backgroundColor: "#5CB338",
                                }}
                                textColor="#fff"
                                contentStyle={{ justifyContent: 'flex-start' }}
                                onPress={() => handleCreate()}
                            >Tạo bàn</ButtonCustom>

                    }

                    <ButtonCustom
                        icon={"autorenew"}
                        mode="contained"
                        style={{
                            backgroundColor: "#FA812F",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={() => handleChangeTable()}
                    >Chuyển bàn</ButtonCustom>

                </View>
                <View>
                    <ButtonCustom
                        mode="contained"
                        icon={"contactless-payment"}
                        style={{
                            backgroundColor: "#4E71FF",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={() => handlePayment()}
                    >Thanh toán</ButtonCustom>
                    <ButtonCustom
                        mode="contained"

                        icon={"close"}
                        style={{
                            backgroundColor: "#FF0B55",
                        }}
                        textColor="#fff"
                        contentStyle={{ justifyContent: 'flex-start' }}
                        onPress={handleAbortTable}
                    >Hủy bàn</ButtonCustom>

                </View> */}

                <View>
                    {
                        isBtnUpdate
                            ? renderButton("Cập nhật", "plus", "#5CB338", handleUpdate , false)
                            : renderButton("Tạo bàn", "plus", "#5CB338", handleCreate  , false)
                    }

                    {renderButton("Chuyển bàn", "autorenew", "#FA812F", handleChangeTable , !isBtnUpdate)}
                </View>

                <View>
                    {renderButton("Thanh toán", "contactless-payment", "#4E71FF", handlePayment , !isBtnUpdate)}
                    {renderButton("Hủy bàn", "close", "#FF0B55", handleAbortTable , !isBtnUpdate)}
                </View>
            </View>
            <Dishmodal
                visible={modalDishVisible}
                onClose={() => setModalDishVisible(false)}
                onItemPress={(items?: IDish[]) => {
                    const newItems = items ?? [];

                    setFoods(prevFoods => {
                        const updatedFoods = [...prevFoods];

                        for (const newItem of newItems) {
                            const index = updatedFoods.findIndex(food => food.id === newItem.id);

                            if (index !== -1) {
                                // Món đã tồn tại → tăng quantity
                                updatedFoods[index] = {
                                    ...updatedFoods[index],
                                    quantity: updatedFoods[index].quantity + 1,
                                };
                            } else {
                                // Món chưa có → thêm mới với quantity = 1
                                updatedFoods.push({
                                    ...newItem,
                                    quantity: 1,
                                });
                            }
                        }

                        return updatedFoods;
                    });
                }}

            />

        </Container>
    );
}
