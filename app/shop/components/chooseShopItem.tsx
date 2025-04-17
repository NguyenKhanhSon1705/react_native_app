import { IShopData } from "@/interfaces/shop/shopDTO";
import React, { useState } from "react";
import { FC } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components";
import ShopOptionModal from "./shopOptionModal";

const Container = styled(View)`
  padding: 12px;
  background-color: #ffffff;
  border-radius: 16px;
  elevation: 4;
  flex-direction: row;
  align-items: center;
  margin: 8px 16px;
`;

const ContainerAvt = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled(View)`
  width: 90px;
  height: 90px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 12px;
`;

const ContainerInfo = styled(View)`
  flex: 1;
`;

const InfoHeader = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
`;

const Tag = styled(Text)`
  background-color: #fce8e6;
  color: #e53935;
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  overflow: hidden;
`;

const Rating = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Star = styled(Text)`
  color: #fbc02d;
  margin-right: 4px;
  font-weight: bold;
`;

interface IPropsItem {
  propsItem: IShopData;
  onPressIdShop: (id: any) => any;
  onPressEdit?: (shop: IShopData) => void;
  onPressDelete?: (shop: IShopData) => void;
}

const ChooseShopItem: FC<IPropsItem> = ({ 
  propsItem, 
  onPressIdShop,
  onPressEdit,
  onPressDelete 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleShowOptions = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    setModalPosition({ top: pageY, left: pageX });
    setModalVisible(true);
  };

  return (
    <Container>
      <ContainerAvt>
        <AvatarContainer>
          <Image
            source={{ uri: propsItem.shopLogo }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </AvatarContainer>

        <ContainerInfo>
          {/* Tên cửa hàng */}
          <InfoHeader>
            <Text
              style={{ fontWeight: "bold", fontSize: 16 }}
              numberOfLines={1}
            >
              {propsItem.shopName}
            </Text>
            <TouchableOpacity onPress={handleShowOptions}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#999" }}>
                ...
              </Text>
            </TouchableOpacity>
          </InfoHeader>

          {/* Tag + Giá */}
          <InfoHeader>
            {/* <Tag>Breakfast</Tag> */}
            {/* <Text style={{ fontSize: 16, fontWeight: "bold", color: "#444" }}>
              $60
            </Text> */}
          </InfoHeader>

          {/* Đánh giá + Nút đi tới */}
          <InfoHeader>
            <Rating>
              <Star>⭐ 4.9</Star>
              <Text style={{ color: "#888" }}>(10 Review)</Text>
            </Rating>
            <Button
              mode="outlined"
              textColor="#ff8c47"
              style={{
                borderColor: "#ff8c47",
                borderWidth: 1,
                borderRadius: 4,
                paddingHorizontal: 4,
              }}
              onPress={() => onPressIdShop(propsItem.id)}
            >
              Đi tới
            </Button>
          </InfoHeader>
        </ContainerInfo>
      </ContainerAvt>

      <ShopOptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={() => {
          onPressEdit?.(propsItem);
          setModalVisible(false);
        }}
        onDelete={() => {
          onPressDelete?.(propsItem);
          setModalVisible(false);
        }}
        position={modalPosition}
      />
    </Container>
  );
};

export default ChooseShopItem;
