import { FC } from "react";
import {View } from "react-native";
import styled from "styled-components";
import ChooseShopItem from "./components/chooseShopItem";


const ChooseShop: FC = () => {
    return (
        <View>
            
            <ChooseShopItem/>
            <ChooseShopItem/>
            <ChooseShopItem/>
        </View>
    );
};

export default ChooseShop