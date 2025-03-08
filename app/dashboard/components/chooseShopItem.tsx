import { FC } from "react";
import { Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import styled from "styled-components";
import avt from '@/assets/img_login.png'
const Container = styled(View)`
    padding: 10px ;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    flex-direction: row;
    align-items: center;
    margin: 6px 12px;
`;
const ContainerAvt = styled(View)`
    flex-direction: row;
    align-items: center;
`;

const AvatarContainer = styled(View)`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    overflow: hidden;
    margin-right: 10px;
`;

const ContainerInfo = styled(View)`
    flex: 1;
`;

const InfoHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding:6px 0;
`;

const Tag = styled(Text)`
    background-color: #ffe6e6;
    color: #ff5733;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 8px;
`;

const Rating = styled(View)`
    flex-direction: row;
    align-items: center;
`;

const Star = styled(Text)`
    color: #ff9800;
    margin-right: 4px;
`;
const ChooseShopItem :FC = ()=> {
    return (
        <Container>
            <ContainerAvt>
                <AvatarContainer>
                    <Avatar.Image style= {{
                        borderRadius: '20',
                        backgroundColor: 'transparent'
                    }} size={100} source={avt} />
                </AvatarContainer>
                <ContainerInfo>
                    <InfoHeader>
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Chicken Thai Biriyani</Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>...</Text>
                    </InfoHeader>
                    <InfoHeader>
                        <Tag>Breakfast</Tag>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>$60</Text>
                    </InfoHeader>
                    <InfoHeader>
                        <Rating>
                            <Star>⭐ 4.9</Star>
                            <Text style={{ color: "#888" }}>(10 Review)</Text>
                        </Rating>
                        <Text style={{ color: "#888" }}>Pick Up</Text>
                    </InfoHeader>
                </ContainerInfo>
            </ContainerAvt>
        </Container>
    )
}

export default ChooseShopItem;