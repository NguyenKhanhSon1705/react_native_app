import { FC } from "react";
import { View } from "react-native";
import styled from "styled-components";
import ChooseShopItem from "./components/chooseShopItem";
import { Button } from "react-native-paper";
import { useTranslate } from "@/utils/hooks/useTranslate";
import { useRouter } from "expo-router";
import ButtonBack from "@/components/buttonBack";

const Container = styled(View)`
    /* margin-top: 20px; */
    background-color: #fff;
`
const ContainerHeader = styled(View)`
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center; 
`
const ChooseShop: FC = () => {
    const router = useRouter();
    
    return (
        <Container>
            <ContainerHeader>
                <ButtonBack
                iconName="angle-left"
                size={36}
                color="#272b3b"
                onPress={() => router.back()} />
                <ButtonBack
                iconName="plus"
                size={36}
                color="#272b3b"
                />
            </ContainerHeader>

            <ChooseShopItem />
            <ChooseShopItem />
            <ChooseShopItem />
        </Container>
    );
};

export default ChooseShop